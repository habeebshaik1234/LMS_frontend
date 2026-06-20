import os
import json
import re
import time
import random
from queue import Queue
from threading import Thread
from transformers import AutoTokenizer
from langchain_community.document_loaders import PyPDFLoader, TextLoader, Docx2txtLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_groq import ChatGroq
from textblob import TextBlob
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain.schema.runnable import RunnableLambda
from config import  get_connection
import pymysql
from batch_llm import batch_summarize

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL")

llm = ChatGroq(api_key=GROQ_API_KEY, model=LLM_MODEL , temperature=0.5)
tokenizer = AutoTokenizer.from_pretrained("NousResearch/Llama-2-7b-chat-hf")

def count_tokens(text):
    return len(tokenizer.encode(text))
short_summary = None
MIN_CHUNK_TOKEN_THRESHOLD = 200
MAX_CHUNKS_TO_PROCESS = 10

class TokenRateLimiter:
    def __init__(self, limit_per_minute=6000):
        self.limit = limit_per_minute
        self.used = 0
        self.last_reset = time.time()

    def reset_if_needed(self):
        now = time.time()
        if now - self.last_reset > 60:
            self.used = 0
            self.last_reset = now

    def wait_if_needed(self, tokens):
        self.reset_if_needed()
        if self.used + tokens > self.limit:
            wait_time = 60 - (time.time() - self.last_reset)
            print(f"Waiting {wait_time:.1f}s for token limit reset...")
            time.sleep(wait_time)
            self.reset_if_needed()
        self.used += tokens

token_limiter = TokenRateLimiter()

class ChunkProcessor:
    def __init__(self):
        self.queue = Queue()
        self.results = []
        self.thread = Thread(target=self._process_queue)
        self.thread.daemon = True
        self.thread.start()

    def _process_queue(self):
        while True:
            item = self.queue.get()
            if item is None:
                break
            chunk_text, result_list = item
            try:
                summary, short_summary = generate_summary(chunk_text)
                result_list.append(summary)
            except Exception as e:
                print(f"Error processing chunk: {e}")
            self.queue.task_done()

    def add_chunk(self, chunk_text, result_list):
        self.queue.put((chunk_text, result_list))

    def wait_for_all(self):
        self.queue.join()

def safe_llm_invoke(prompt):
    tokens = count_tokens(prompt)
    token_limiter.wait_if_needed(tokens)
    try:
        ai_message = llm.invoke(prompt)
        return ai_message
    except Exception as e:
        if "rate limit" in str(e).lower() or "429" in str(e):
            wait_time = random.uniform(5, 15)
            print(f"Rate limit hit. Retrying in {wait_time:.1f}s...")
            time.sleep(wait_time)
            raise
        raise

def extract_json_from_response(response_text):
    try:
        # Normalize quotes
        cleaned = response_text.replace('"', '"').replace('"', '"').replace("'", "'")
        
        final_questions = []
        
        # First, try to extract a JSON array
        array_match = re.search(r'\[\s*\{.*?\}\s*\]', cleaned, re.DOTALL)
        if array_match:
            try:
                json_array = json.loads(array_match.group())
                print(f"Successfully parsed JSON array with {len(json_array)} items")
                for item in json_array:
                    q = extract_valid_question(item)
                    if q:
                        final_questions.append(q)
                return final_questions
            except json.JSONDecodeError as e:
                print(f"Failed to parse JSON array: {e}")
        
        # Fallback: Use regex to find individual objects
        print("Falling back to regex extraction...")
        # Improved regex to capture objects with content
        object_matches = re.findall(r'\{(?:[^{}]|(?:\{[^{}]*\}))*\}', cleaned, re.DOTALL)
        print(f"Found {len(object_matches)} potential question objects")
        
        for obj_str in object_matches:
            # Clean up common JSON issues
            temp = re.sub(r',\s*}', '}', obj_str)
            temp = re.sub(r',\s*]', ']', temp)
            temp = re.sub(r'(?<!")(\b[A-Za-z_]+\b)(?=\s*:)', r'"\1"', temp)
            
            try:
                q = json.loads(temp)
                extracted = extract_valid_question(q)
                if extracted:
                    final_questions.append(extracted)
            except json.JSONDecodeError as e:
                print(f"Failed to parse question object: {e}")
                continue
        
        print(f"Total valid questions extracted: {len(final_questions)}")
        return final_questions
    except Exception as e:
        print(f"Error in extract_json_from_response: {e}")
        import traceback
        traceback.print_exc()
        return []

def extract_valid_question(q):
    """Helper function to validate and extract a single question"""
    try:
        if not isinstance(q, dict):
            return None
        
        if "question" not in q:
            print("Question missing 'question' field")
            return None
        
        question_text = q.get("question", "").strip()
        if not question_text:
            print("Question text is empty")
            return None
        
        options = {
            "A": q.get("A", "").strip(),
            "B": q.get("B", "").strip(),
            "C": q.get("C", "").strip(),
            "D": q.get("D", "").strip()
        }
        
        # Check all options are present
        if any(not options[k] for k in ["A", "B", "C", "D"]):
            print(f"Question has missing options: {options}")
            return None
        
        raw_answer = (q.get("Answer") or q.get("answer") or "").strip()
        
        # Try direct letter match first
        answer = raw_answer.upper() if raw_answer.upper() in ["A", "B", "C", "D"] else None
        
        # If not a letter, try to match by option text
        if answer is None:
            for letter, text in options.items():
                if raw_answer.lower() == text.lower():
                    answer = letter
                    break
        
        # Validate answer is one of A, B, C, D
        if answer not in ["A", "B", "C", "D"]:
            print(f"Invalid answer: {raw_answer} -> {answer}")
            return None
        
        return {
            "question": question_text,
            "A": options["A"],
            "B": options["B"],
            "C": options["C"],
            "D": options["D"],
            "Answer": answer
        }
    except Exception as e:
        print(f"Error extracting valid question: {e}")
        return None

def generate_summary(document_text):
    summary_prompt = PromptTemplate(
        input_variables=["text"],
        template=(
            "Summarize the following text in a structured manner:\n\n"
            "{text}\n\n"
            "### Summary (Concise & Formal):"
        ),
    )
    formatted_prompt = summary_prompt.format(text=document_text)
    ai_message = safe_llm_invoke(formatted_prompt)
    full_summary = ai_message.content.strip() if hasattr(ai_message, "content") else str(ai_message).strip()

    short_summary_prompt = PromptTemplate(
        input_variables=["text"],
        template=(
            "Based on the detailed summary below, generate a concise summary within 1000 to 1500 words"
            "### Original Summary:\n{text}\n\n"
            "### Shortened Summary:"
        ),
    )
    short_prompt_text = short_summary_prompt.format(text=full_summary)
    short_summary_ai_message = safe_llm_invoke(short_prompt_text)
    short_summary = short_summary_ai_message.content.strip() if hasattr(short_summary_ai_message, "content") else str(short_summary_ai_message).strip()

    if not short_summary.strip():
        short_summary = "No summary available."
        full_summary = short_summary
    return full_summary, short_summary

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

def generate_questions(summary, token_count, company_code):

    minimum_required = get_minimum_questions(company_code)
    num_questions = max(minimum_required, 20 if token_count < 5000 else (30 if token_count <= 10000 else 40))
    print(f"this are the total questions to be generated : {num_questions}")

    all_questions = []
    max_retries = 3
    attempts = 0
    needed = num_questions

    while len(all_questions) < needed and attempts < max_retries:
        remaining = needed - len(all_questions)
        question_prompt = (
            "You are an AI-powered **exam question generator**. Below is the summary of the document:\n\n"
            "{text}\n\n"
            f"Based on this summary, generate exactly **{remaining}** multiple-choice questions (MCQs) in JSON format.\n\n"
            "**Ensure a strong mix of different question styles:**\n"
            "- **Definition-based (10%)** → Example: 'What does X mean?'\n"
            "- **Scenario-based (20%)** → Example: 'If X occurs, what would be the best solution?'\n"
            "- **Application-based (20%)** → Example: 'How would you apply X in real life?'\n"
            "- **Comparison-based (15%)** → Example: 'What are the key differences between X and Y?'\n"
            "- **Cause & Effect (15%)** → Example: 'What happens when X takes place?'\n"
            "- **Fill in the blanks (10%)** → Example: '______ is an example of X.'\n"
            "- **Critical Thinking (10%)** → Example: 'Analyze this situation and choose the best response.'\n\n"
            "**Rules:**\n"
            "- **STRICTLY LIMIT 'What is' questions to 10% max.**\n"
            "- **Ensure balanced difficulty levels (Easy 30%, Medium 50%, Hard 20%).**\n"
            "- **Avoid generic or overly simple questions.**\n\n"
            "**Output Format (STRICT JSON ONLY, NO EXTRA TEXT, DONT FORGOT SINGLE KEY AND VALUE):**\n"
            "[\n"
            "  {{\n"
            '    "question": "question text",\n'
            '    "A": "Option 1",\n'
            '    "B": "Option 2",\n'
            '    "C": "Option 3",\n'
            '    "D": "Option 4",\n'
            '     "Answer": "<Correct option: A, B, C, or D>"\n'
            "  }}\n"
            "]"
        )
        try:
            chain = RunnableLambda(lambda x: question_prompt.format(text=x["text"], num_questions=x["num_questions"])) | llm
            ai_message = safe_llm_invoke(question_prompt.format(text=summary, num_questions=remaining))
            raw_output = ai_message.content.strip()
            
            # Log the raw output for debugging
            print(f"Raw LLM output length: {len(raw_output)} characters")
            print(f"Raw output preview: {raw_output[:500]}...")
            
            new_questions = extract_json_from_response(raw_output)
            print(f"Extracted {len(new_questions)} new questions from attempt {attempts+1}")
            
            # Avoid duplicates
            existing_qs = set(q["question"].strip().lower() for q in all_questions)
            added_count = 0
            for q in new_questions:
                if q["question"].strip().lower() not in existing_qs:
                    all_questions.append(q)
                    existing_qs.add(q["question"].strip().lower())
                    added_count += 1
            print(f"Added {added_count} unique questions. Total now: {len(all_questions)}")
        except Exception as e:
            print(f"Error in generate_questions (attempt {attempts+1}): {e}")
            import traceback
            traceback.print_exc()
        attempts += 1

    return all_questions[:needed]

def process_document(document_path, company_code):
    try:
        if not os.path.exists(document_path):
            raise Exception(f"Document not found: {document_path}")

        file_ext = os.path.splitext(document_path)[1].lower()
        if file_ext == '.pdf':
            loader = PyPDFLoader(document_path)
        elif file_ext == '.txt':
            loader = TextLoader(document_path)
        elif file_ext == '.docx':
            loader = Docx2txtLoader(document_path)
        else:
            raise Exception(f"Unsupported file type: {file_ext}")

        documents = loader.load()
        all_text = "\n".join(doc.page_content for doc in documents)

        # ✅ Truncate if too long — no need to process 100 pages for 20 questions
        if len(all_text) > 15000:
            all_text = all_text[:15000]

        # ✅ Skip chunk processing — summarize directly
        results = batch_summarize([all_text])   # list in, list out
        full_summary, short_summary = results[0]
        token_count = len(all_text.split())

        questions_list = generate_questions(full_summary, token_count, company_code)
        print(f"Generated {len(questions_list)} questions")

        return short_summary, questions_list[:20], token_count

    except Exception as e:
        print(f"Error in process_document: {str(e)}")
        import traceback
        traceback.print_exc()
        raise Exception(f"Document processing failed: {str(e)}")