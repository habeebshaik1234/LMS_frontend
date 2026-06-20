# bulk_processor.py  —  place in your project root
import os, json, uuid, time, queue, tempfile, threading
from concurrent.futures import ProcessPoolExecutor, as_completed
from flask import request, Response, jsonify
from werkzeug.utils import secure_filename
from config import get_connection
import pymysql
from api_functions import store_questions_bulk, format_length
flask_app = None 

VIDEO_SEMAPHORE    = threading.Semaphore(2)  # max 2 videos at once (Whisper is heavy)
DOCUMENT_SEMAPHORE = threading.Semaphore(4) 

# ── worker (runs in subprocess) ────────────────────────────────────────────────
def _process_one(payload: dict) -> dict:
    idx          = payload["section_idx"]
    path         = payload["temp_path"]
    is_video     = payload["is_video"]
    is_document  = payload["is_document"]
    is_manual    = payload["is_manual"]
    company_code = payload["company_code"]

    print(f"[WORKER] section {idx} waiting for slot... is_video={is_video} is_document={is_document}")

    # Acquire the appropriate semaphore before doing heavy work
    if is_video:
        semaphore = VIDEO_SEMAPHORE
    elif is_document:
        semaphore = DOCUMENT_SEMAPHORE
    else:
        semaphore = None

    if semaphore:
        semaphore.acquire()
        print(f"[WORKER] section {idx} acquired slot")

    try:
        from quality_reduce import reduce_video_quality
        from extract_questions import process_video_task
        from document import process_document
        from api_functions import upload_to_s3
        AWS_BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")

        compressed_key = None

        if not path:
            print(f"[WORKER] section {idx} no file, manual section")
            return {"section_idx": idx, "ok": True, "manual": True,
                    "compressed_key": "", "summary": "", "questions": [], "length": None}

        if is_video:
            print(f"[WORKER] section {idx} compressing video...")
            compressed_key, error = reduce_video_quality(path)
            if error:
                raise Exception(f"Compression failed: {error}")
            print(f"[WORKER] section {idx} compressed_key={compressed_key}")

        elif is_document:
            print(f"[WORKER] section {idx} uploading document...")
            s3_key = upload_to_s3(path, AWS_BUCKET_NAME, os.path.basename(path))
            if not s3_key:
                raise Exception("Document S3 upload failed")
            compressed_key = s3_key
            print(f"[WORKER] section {idx} s3_key={compressed_key}")

        if is_manual:
            return {"section_idx": idx, "ok": True,
                    "compressed_key": compressed_key or "", "manual": True,
                    "summary": "", "questions": [], "length": None}

        if is_video:
            print(f"[WORKER] section {idx} generating questions from video...")
            section_id_str = str(uuid.uuid4())
            try:
                res = _with_retry(lambda: process_video_task(path, section_id_str, company_code))
                summary   = res.get("summary", "")
                questions = res.get("questions", [])
                length    = res.get("length", 0)
                print(f"[WORKER] section {idx} questions={len(questions)}")
            except Exception as q_err:
                print(f"[WORKER] section {idx} AI processing failed (non-fatal): {q_err}")
                summary   = ""
                questions = []
                length    = 0

            return {"section_idx": idx, "ok": True, "is_video": True,
                    "compressed_key": compressed_key,
                    "summary":    summary,
                    "questions":  questions,
                    "length":     length}

        if is_document:
            print(f"[WORKER] section {idx} processing document for questions...")
            try:
                short_summary, questions, token_count = _with_retry(
                    lambda: process_document(path, company_code)
                     )                
                print(f"[WORKER] section {idx} questions={len(questions)}")
            except Exception as doc_err:
                print(f"[WORKER] section {idx} document AI failed (non-fatal): {doc_err}")
                short_summary = ""
                questions     = []
                token_count   = 0

            return {"section_idx": idx, "ok": True, "is_document": True,
                    "compressed_key": compressed_key,
                    "summary":    short_summary,
                    "questions":  questions,
                    "length":     token_count}

        # Manual section with file (no AI processing)
        return {"section_idx": idx, "ok": True, "manual": True,
                "compressed_key": compressed_key or "", "summary": "", "questions": [], "length": None}

    except Exception as e:
        print(f"[WORKER] section {idx} EXCEPTION: {e}")
        import traceback
        traceback.print_exc()
        return {"section_idx": idx, "ok": False,
                "error": str(e), "trace": traceback.format_exc()}

    finally:
        if semaphore:
            semaphore.release()
            print(f"[WORKER] section {idx} released slot")


# ── DB commit helper ──────────────────────────────────────────────────────────
def _commit_to_db(res: dict, meta: dict, company_code: str):
    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        length = format_length(res.get("length"))

        print(f"[DB] company={company_code}")
        print(f"[DB] module_id={meta['module_id']}")
        print(f"[DB] section_name={meta['section_name']}")
        print(f"[DB] summary={str(res.get('summary', ''))[:50]}")
        print(f"[DB] compressed_key={res.get('compressed_key')}")
        print(f"[DB] length={length}")
        print(f"[DB] created_by={meta['created_by']}")

        cursor.callproc("lms_add_section", (
            0,
            meta["module_id"],
            meta["section_name"],
            meta.get("description", ""),
            res.get("summary") or "",
            res.get("compressed_key") or "",
            length,
            meta["created_by"],
        ))
        row = cursor.fetchone()
        print(f"[DB] proc result={row}")

        try:
            while cursor.fetchone(): pass
        except: pass

        if not row or row.get("status") != "success":
            raise Exception(f"lms_add_section proc failed: {row}")

        new_section_id = row["section_id"]
        store_questions_bulk(cursor, new_section_id, res.get("questions", []))
        connection.commit()
        res["new_section_id"] = new_section_id
        print(f"[DB] section saved id={new_section_id}")

    except Exception as e:
        print(f"[DB] ERROR: {e}")
        import traceback
        traceback.print_exc()
        raise
    finally:
        cursor.close()
        connection.close()


# ── Flask endpoint ─────────────────────────────────────────────────────────────
def lms_bulk_add_sections():
    company_code = request.form.get("company_code")
    created_by   = request.form.get("created_by")
    total        = int(request.form.get("total_sections", 0))

    print(f"[BULK] company={company_code} created_by={created_by} total={total}")

    if not company_code or not total:
        return jsonify({"error": "company_code and total_sections required"}), 400

    temp_dir = os.path.join(tempfile.gettempdir(), "lms_bulk")
    os.makedirs(temp_dir, exist_ok=True)

    payloads, metas = [], []

    for i in range(total):
        f = request.files.get(f"files[{i}]")

        meta = {
            "section_name": request.form.get(f"sections[{i}][section_name]", f"Section {i+1}"),
            "module_id":    request.form.get(f"sections[{i}][module_id]"),
            "description":  request.form.get(f"sections[{i}][description]", ""),
            "is_manual":    int(request.form.get(f"sections[{i}][is_manual]", 0)),
            "created_by":   created_by,
        }

        if f and f.filename:
            fname = secure_filename(f.filename)
            path  = os.path.join(temp_dir, f"{int(time.time())}_{i}_{fname}")
            f.save(path)
            is_video    = fname.lower().endswith(('.mp4', '.avi', '.mov', '.mkv'))
            is_document = fname.lower().endswith(('.pdf', '.txt', '.docx'))
            print(f"[BULK] section {i} file={fname} is_video={is_video} is_document={is_document}")
        else:
            path        = None
            is_video    = False
            is_document = False
            print(f"[BULK] section {i} no file")

        metas.append(meta)
        payloads.append({
            "section_idx":  i,
            "temp_path":    path,
            "is_video":     is_video,
            "is_document":  is_document,
            "is_manual":    meta["is_manual"],
            "company_code": company_code,
        })

    print(f"[BULK] built {len(payloads)} payloads, starting SSE stream")

    # ── pull all request data before entering the generator ──
    # (request context is not available inside the generator)
    captured_payloads = payloads
    captured_metas    = metas
    captured_company  = company_code

    def generate():
        pq = queue.Queue()

        def run(p):
            print(f"[THREAD] starting section {p['section_idx']}")
            with flask_app.app_context():
                try:
                    r = _process_one(p)
                    print(f"[THREAD] section {p['section_idx']} finished ok={r.get('ok')}")
                except Exception as e:
                    print(f"[THREAD] section {p['section_idx']} CRASHED: {e}")
                    import traceback
                    traceback.print_exc()
                    r = {"section_idx": p["section_idx"], "ok": False, "error": str(e)}
            pq.put(r)

        threads = [
            threading.Thread(target=run, args=(p,), daemon=True)
            for p in captured_payloads
        ]
        print(f"[SSE] launching {len(threads)} threads")
        for i, t in enumerate(threads):
            t.start()
            if i < len(threads) - 1:
                time.sleep(0.5)

        results_map = {}
        collected = 0
        while collected < len(captured_payloads):
            try:
                res = pq.get(timeout=600)
                results_map[res["section_idx"]] = res
                collected += 1
                print(f"[SSE] collected {collected}/{len(captured_payloads)} results")
            except queue.Empty:
                print("[SSE] queue timeout")
                yield "data: {\"status\":\"heartbeat\"}\n\n"
                break

        # ── Commit in order (0, 1, 2, ...) ──
        for idx in sorted(results_map.keys()):
            res = results_map[idx]
            print(f"[SSE] committing section {idx} in order")

            if res["ok"]:
                try:
                    _commit_to_db(res, captured_metas[idx], captured_company)
                    yield f"data: {json.dumps({'section_idx': idx, 'status': 'done', 'section_name': captured_metas[idx]['section_name'], 'section_id': res.get('new_section_id')})}\n\n"
                except Exception as db_err:
                    print(f"[SSE] DB error section {idx}: {db_err}")
                    import traceback
                    traceback.print_exc()
                    yield f"data: {json.dumps({'section_idx': idx, 'status': 'db_error', 'error': str(db_err)})}\n\n"
            else:
                print(f"[SSE] section {idx} failed: {res.get('error')}")
                yield f"data: {json.dumps({'section_idx': idx, 'status': 'error', 'error': res.get('error', 'Unknown')})}\n\n"

        for p in captured_payloads:
            if p.get("temp_path"):
                try:
                    os.remove(p["temp_path"])
                except:
                    pass

        print("[SSE] all done")
        yield f"data: {json.dumps({'status': 'all_done', 'total': len(captured_payloads)})}\n\n"

    return Response(
        generate(),
        mimetype="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"}
    )

def _with_retry(fn, retries=3, delay=5):
    """Retry a function with exponential backoff."""
    for attempt in range(retries):
        try:
            return fn()
        except Exception as e:
            if attempt == retries - 1:
                raise
            wait = delay * (2 ** attempt)
            print(f"[RETRY] attempt {attempt+1} failed: {e}. Retrying in {wait}s...")
            time.sleep(wait)