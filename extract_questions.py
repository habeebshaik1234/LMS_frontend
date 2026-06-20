import os
import re
import random
import json
import ffmpeg
import shutil
import threading
import time
import uuid
from queue import Queue
from flask import jsonify, request
from faster_whisper import WhisperModel
from concurrent.futures import ThreadPoolExecutor, as_completed
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
from dotenv import load_dotenv
from transformers import AutoTokenizer
from langchain.schema import HumanMessage
from textblob import TextBlob
import traceback
from config import  get_connection
import pymysql
from whisper_pool import get_whisper_model


video_executor = ThreadPoolExecutor(max_workers=2)
traceback.print_exc()

tokenizer = AutoTokenizer.from_pretrained("NousResearch/Llama-2-7b-chat-hf")
whisper_model = get_whisper_model()

def count_tokens(text):
    return len(tokenizer.encode(text))

MIN_CHUNK_TOKEN_THRESHOLD = 100
MAX_CHUNKS_TO_PROCESS = 5


load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL")

llm = ChatGroq(api_key=GROQ_API_KEY, model=LLM_MODEL , temperature=0.5)

video_queue = Queue()
result_map = {}

RESULTS_DIR = "results"
os.makedirs(RESULTS_DIR, exist_ok=True)

video_results = {}  

def transcribe_video_to_text(video_path, section_id):
    chunk_paths, total_duration, _ = split_audio_chunks(video_path, duration=600, section_id=section_id)
    model = get_whisper_model()

    def transcribe_chunk(chunk_path):
        segments, _ = model.transcribe(chunk_path)
        return " ".join([segment.text for segment in segments])

    transcript_chunks = []
    with ThreadPoolExecutor(max_workers=2) as executor:
        futures = [executor.submit(transcribe_chunk, path) for path in chunk_paths]
        for i, future in enumerate(futures):
            try:
                print(f"Transcribing chunk {i + 1}/{len(chunk_paths)} (parallel)...")
                transcript_chunks.append(future.result())
            except Exception as e:
                print(f"Error transcribing chunk {i+1}: {e}")

    return " ".join(transcript_chunks)


def background_worker():
    while True:
        try:
            item = video_queue.get(timeout=10)  
        except Exception:
            print("Queue empty, stopping background worker.")
            break

        section_id = item.get("section_id")
        video_path = item.get("video_path")
        company_code = item.get("company_code")

        try:
            result = process_video_task(video_path, section_id, company_code)
            save_result(section_id, result)
        except Exception as e:
            print(f"Error in background task: {str(e)}")
            continue


class ChunkProcessor:
    def __init__(self):
        self.queue = Queue()
        self.results = []
        self.thread = threading.Thread(target=self._process_queue)
        self.thread.daemon = True
        self.thread.start()

    def _process_queue(self):
        while True:
            item = self.queue.get()
            if item is None:
                break
            chunk_text, result_list = item
            try:
                result_list.append(chunk_text)
            except Exception as e:
                print(f"Error processing chunk: {e}")
            self.queue.task_done()


    def add_chunk(self, chunk_text, result_list):
        self.queue.put((chunk_text, result_list))

    def wait_for_all(self):
        self.queue.join()


def save_result(section_id, result):
    if section_id:
        with open(os.path.join(RESULTS_DIR, f"{section_id}.json"), "w") as f:
            json.dump(result, f)

def load_result(section_id):
    path = os.path.join(RESULTS_DIR, f"{section_id}.json")
    if os.path.exists(path):
        with open(path) as f:
            return json.load(f)
    return None

threading.Thread(target=background_worker, daemon=True).start()

def extract_audio(video_path, output_path):
    try:
        ffmpeg.input(video_path).output(output_path, format="wav", ac=1, ar=8000).run(overwrite_output=True)
        print("audio extraction is started..")
    except ffmpeg.Error as e:
        raise RuntimeError(f"ffmpeg error during audio extraction: {e.stderr.decode()}")


def transcribe_audio(audio_path):
    segments, _ = whisper_model.transcribe(audio_path)
    return " ".join([seg.text for seg in segments])

def split_audio_chunks(video_path, duration=300, section_id=""):
    output_dir = f"chunks/{section_id}"
    os.makedirs(output_dir, exist_ok=True)

    probe = ffmpeg.probe(video_path)
    total_duration = float(probe["format"]["duration"])
    chunk_paths = []

    for i in range(0, int(total_duration), duration):
        chunk_path = os.path.join(output_dir, f"{section_id}_part{i}.wav")
        ffmpeg.input(video_path, ss=i, t=duration).output(chunk_path, format="wav", ac=1, ar=8000).run(overwrite_output=True)
        chunk_paths.append(chunk_path)

    return chunk_paths, total_duration, output_dir

def call_with_retry(llm, messages, retries=3):
    for i in range(retries):
        try:
            return llm.invoke(messages)
        except Exception as e:
            if i == retries - 1:
                raise e
            time.sleep(2 ** i)

def generate_summary(text):
    # ✅ Truncate input to avoid token limit issues
    max_chars = 8000
    if len(text) > max_chars:
        text = text[:max_chars]

    # ✅ Generate both summaries in ONE prompt instead of two separate LLM calls
    combined_prompt = PromptTemplate(
        input_variables=["text"],
        template=(
            "You are a professional summarizer. Given the following content, produce TWO summaries:\n\n"
            "1. FULL SUMMARY: A detailed summary in 400-600 words.\n"
            "2. SHORT SUMMARY: A concise version in 150-200 words.\n\n"
            "Format your response EXACTLY as:\n"
            "FULL_SUMMARY: <full summary text>\n"
            "SHORT_SUMMARY: <short summary text>\n\n"
            "Content:\n{text}"
        )
    ).format(text=text)

    response = call_with_retry(llm, [HumanMessage(content=combined_prompt)])
    content = response.content.strip()

    # Parse both summaries from single response
    full_summary = ""
    short_summary = ""

    if "FULL_SUMMARY:" in content and "SHORT_SUMMARY:" in content:
        parts = content.split("SHORT_SUMMARY:")
        full_summary = parts[0].replace("FULL_SUMMARY:", "").strip()
        short_summary = parts[1].strip()[:2000]
    else:
        # Fallback if format not followed
        full_summary = content
        short_summary = content[:500]

    return full_summary, short_summary or "No summary available."

def get_minimum_questions(company_code):
    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    try:
        cursor.execute("""
            SELECT attribute_value 
            FROM lms_scoring_config 
            WHERE attribute_name = 'Total Questions Per Section' OR id = 5
            LIMIT 1
        """)
        row = cursor.fetchone()
        if row and row["attribute_value"].isdigit():
            return int(row["attribute_value"])
        return 15   
    except:
        return 15
    finally:
        cursor.close()
        connection.close()


def generate_questions(summary, video_duration_or_token_count, company_code):
    minimum_required = get_minimum_questions(company_code)

    # ✅ Determine num_questions based on input type (video or document)
    if isinstance(video_duration_or_token_count, float) or video_duration_or_token_count > 500:
        # Video: duration in seconds
        duration = video_duration_or_token_count
        if duration < 300:
            num_questions = 8
        elif duration < 600:
            num_questions = 12
        elif duration < 1200:
            num_questions = 18
        else:
            num_questions = 25
    else:
        # Document: token count
        tokens = video_duration_or_token_count
        num_questions = 15 if tokens < 5000 else (25 if tokens <= 10000 else 35)

    needed = max(num_questions, minimum_required)
    needed = min(needed, 30)  # Cap at 30

    if not summary or needed == 0:
        return []

    all_questions = []
    max_retries = 4  # ✅ increased retries
    attempts = 0

    while len(all_questions) < needed and attempts < max_retries:
        remaining = needed - len(all_questions)

        prompt = f"""You are an MCQ generator for an LMS platform.
Generate exactly {remaining} multiple-choice questions based on this summary:

{summary[:6000]}

Rules:
- Mix question types: definition, scenario, application, comparison, cause-effect
- Each question must have 4 options (A, B, C, D) and one correct answer
- Respond ONLY with a valid JSON array. No explanation, no markdown.

Format:
[{{"question": "...", "A": "...", "B": "...", "C": "...", "D": "...", "Answer": "B"}}]"""

        try:
            # ✅ Direct LLM call without chain wrapper (faster)
            response = call_with_retry(llm, [HumanMessage(content=prompt)])
            raw = response.content.strip()

            # ✅ Strip markdown code blocks if present
            if raw.startswith("```"):
                raw = re.sub(r"^```(?:json)?\n?", "", raw)
                raw = re.sub(r"\n?```$", "", raw)

            new_questions = extract_valid_json(raw)
            print(f"Attempt {attempts+1}: extracted {len(new_questions)} questions")

            existing = {q["question"].strip().lower() for q in all_questions}
            added = 0
            for q in new_questions:
                if q["question"].strip().lower() not in existing:
                    all_questions.append(q)
                    existing.add(q["question"].strip().lower())
                    added += 1
            print(f"Added {added} unique questions. Total: {len(all_questions)}/{needed}")

        except Exception as e:
            print(f"Question generation attempt {attempts+1} failed: {e}")
            time.sleep(2 ** attempts)  # ✅ exponential backoff

        attempts += 1

    print(f"Final question count: {len(all_questions)}")
    return all_questions[:needed]

def extract_valid_json(raw_output):

    try:
        temp = re.sub(r',\s*}', '}', raw_output)
        temp = re.sub(r',\s*\]', ']', temp)

        temp = re.sub(r'(?P<val>"[^"]+),(?=\s*"[\w]+":)', r'\g<val>",', temp)

        temp = temp.replace("“", "\"").replace("”", "\"").replace("’", "'")

        object_matches = re.findall(r'\{[^{}]*\}', temp, re.DOTALL)

        final_questions = []
        for obj_str in object_matches:
            block = re.sub(r',\s*}', '}', obj_str)
            block = re.sub(r',\s*]', ']', block)

            block = re.sub(r'(?<!")(\b[A-Za-z_]+\b)(?=\s*:)', r'"\1"', block)

            try:
                q = json.loads(block)
            except json.JSONDecodeError:
                continue

            if not isinstance(q, dict) or "question" not in q:
                continue

            question_text = q.get("question", "").strip()
            if not question_text:
                continue

            options = {
                "A": q.get("A", "").strip(),
                "B": q.get("B", "").strip(),
                "C": q.get("C", "").strip(),
                "D": q.get("D", "").strip()
            }
            if any(not options[k] for k in ["A", "B", "C", "D"]):
                continue

            raw_answer = (q.get("Answer") or q.get("answer") or "").strip()
            answer = raw_answer.upper() if raw_answer.upper() in ["A", "B", "C", "D"] else None
            if answer is None:
                for letter, text in options.items():
                    if raw_answer == text:
                        answer = letter
                        break

            if answer not in ["A", "B", "C", "D"]:
                continue

            final_questions.append({
                "question": question_text,
                "A": options["A"],
                "B": options["B"],
                "C": options["C"],
                "D": options["D"],
                "Answer": answer
            })

        return final_questions

    except Exception:
        return []

def get_video_length(video_path):
    try:
        metadata = ffmpeg.probe(video_path)
        duration = float(metadata['format']['duration'])
        return duration
    except Exception as e:
        return None

def process_video_task(video_path, section_id, company_code):
    try:  
        model = get_whisper_model()      
        # ✅ Split into larger chunks to reduce overhead
        chunk_paths, total_duration, output_dir = split_audio_chunks(
            video_path, duration=300, section_id=section_id
        )

        # ✅ Transcribe all chunks in parallel
        def transcribe_chunk(path):
            segments, _ = model.transcribe(path, beam_size=1)  # beam_size=1 is faster
            return " ".join(seg.text for seg in segments)

        transcript_chunks = []
        with ThreadPoolExecutor(max_workers=2) as executor:  # ✅ increase workers
            futures = {executor.submit(transcribe_chunk, p): i for i, p in enumerate(chunk_paths)}
            results = {}
            for future in as_completed(futures):
                idx = futures[future]
                try:
                    results[idx] = future.result()
                except Exception as e:
                    print(f"Chunk {idx} transcription error: {e}")
                    results[idx] = ""
            transcript_chunks = [results[i] for i in sorted(results)]

        transcript = " ".join(transcript_chunks)

        if not transcript.strip():
            raise Exception("Transcription produced empty text")

        # ✅ Skip chunk processing — summarize transcript directly in one call
        full_summary, short_summary = generate_summary(transcript)

        questions = generate_questions(full_summary, total_duration, company_code)

        return {
            "summary": short_summary,
            "questions": questions,
            "length": total_duration
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise Exception(f"Failed to process video for section {section_id}: {str(e)}")

    finally:
        output_dir = f"chunks/{section_id}"
        if os.path.exists(output_dir):
            shutil.rmtree(output_dir, ignore_errors=True)

def process_video():
    try:
        data = request.json
        video_path = data.get("video_path")
        company_code = data.get("company_code")
        async_process = data.get("async", False)  # New parameter for async processing

        if not video_path or not os.path.isfile(video_path):
            return jsonify({"error": "Invalid or missing video file"}), 400

        section_id = str(uuid.uuid4())

        if async_process:
            # Submit to background queue
            video_queue.put({
                "section_id": section_id,
                "video_path": video_path,
                "company_code": company_code
            })
            return jsonify({
                "message": "Video processing started in background",
                "section_id": section_id,
                "status": "processing"
            }), 202
        else:
            # Synchronous processing
            future = video_executor.submit(process_video_task, video_path, section_id, company_code)
            result = future.result()

            result_path = os.path.join(RESULTS_DIR, f"{section_id}.json")
            if os.path.exists(result_path):
                os.remove(result_path)

            return jsonify({
                "message": "Summary and questions generated successfully",
                "section_id": section_id,
                "summary": result.get("summary"),
                "questions": result.get("questions")
            }), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
