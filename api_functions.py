from multiprocessing.dummy import connection

from flask import Flask, app, jsonify, request, send_file
from datetime import datetime, timedelta
from config import get_connection, get_variants
import boto3
from botocore.exceptions import NoCredentialsError
import os
import mimetypes
from concurrent.futures import ThreadPoolExecutor
from quality_reduce import reduce_quality
from extract_questions import  process_video
from document import process_document
import requests
import concurrent.futures
import ffmpeg
import json
import re
from datetime import date, timedelta
import pymysql
from dotenv import load_dotenv
from langchain_groq import ChatGroq
import base64
import os
import tempfile
from flask import request, jsonify
from werkzeug.utils import secure_filename
from concurrent.futures import ThreadPoolExecutor
import random
import ast
import time
from urllib.parse import urlparse
import docx
import html
import jwt
from jose import jwk

from botocore.exceptions import ClientError

import requests
from jose import jwt as ms_jwt
from jose.exceptions import JWTError
from jwt.exceptions import InvalidTokenError, InvalidSignatureError

import mimetypes
from botocore.exceptions import NoCredentialsError

import asyncio
from jinja2 import Environment, FileSystemLoader, select_autoescape
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import aiosmtplib
import smtplib

from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = os.getenv("SMTP_PORT")
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")

# # Microsoft SSO Configuration

# TENANT_ID = "795b4059-0b8c-4da4-8f91-88ded8b06e90"
# CLIENT_ID = "9880783e-99a7-42e9-b869-ca57f47527dd"
# AUDIENCE = f"api://{CLIENT_ID}"

# JWKS_URL = f"https://login.microsoftonline.com/{TENANT_ID}/discovery/v2.0/keys"

# SECRET_KEY = "ff9b81d3cfe63d35c17b6e0cdd07aa2ee06a7e0bfc6322d2de453c7d03c73739"




# def jwk_to_pem(jwk):
#     n = int.from_bytes(base64.urlsafe_b64decode(jwk['n'] + '=='), 'big')
#     e = int.from_bytes(base64.urlsafe_b64decode(jwk['e'] + '=='), 'big')
#     pub_key = rsa.RSAPublicNumbers(e, n).public_key()
#     pem = pub_key.public_bytes(
#         encoding=serialization.Encoding.PEM,
#         format=serialization.PublicFormat.SubjectPublicKeyInfo
#     )
#     print(f"Converted JWK to PEM: {pem}")
#     return pem

# JWKS_CACHE = {"keys": [], "fetched_at": None}
# def get_jwks():
#     global JWKS_CACHE
#     if not JWKS_CACHE["fetched_at"] or (datetime.utcnow() - JWKS_CACHE["fetched_at"]).total_seconds() > 86400:
#         JWKS_CACHE["keys"] = requests.get(JWKS_URL).json().get("keys", [])
#         JWKS_CACHE["fetched_at"] = datetime.utcnow()
#     return JWKS_CACHE["keys"]


# def get_microsoft_public_key(token):
#     try:
#         headers = jwt.get_unverified_header(token)
#         print(f"Token headers: {headers}")
#         kid = headers.get("kid")
#         print(f"Looking for key ID: {kid}")
#         if not kid:
#             return None
#         for key in get_jwks():
#             if key.get("kid") == kid:
#                 return jwk_to_pem(key)
#         return None
#     except Exception as e:
#         print(f"get_microsoft_public_key error: {e}")
#         return None


# def microsoft_sso_login():
#     if request.method == "OPTIONS":
#         print("Received CORS preflight request")
#         return jsonify({"status": True, "message": "CORS preflight"}), 200

#     try:

#         data = request.get_json(force=True)
#         print(f"Received request data: {data}")

#         if not data:
#             print("Empty request body")
#             return jsonify({"status": False, "message": "Empty request body"}), 400

#         token = data.get("access_token") or data.get("token") or data.get("id_token")

#         if not token:
#             print("Missing access token in request")
#             return jsonify({"status": False, "message": "Access token missing"}), 400

#         unverified_payload = jwt.decode(token, options={"verify_signature": False})
#         print("Unverified payload:", json.dumps(unverified_payload, indent=2))

#         pem_key = get_microsoft_public_key(token)
#         if not pem_key:
#             print("No matching public key found for token KID")
#             return jsonify({"status": False, "message": "Invalid key ID"}), 401

#         decoded_token = jwt.decode(
#             token,
#             pem_key,
#             algorithms=["RS256"],
#             audience=CLIENT_ID,
#             issuer=f"https://login.microsoftonline.com/{TENANT_ID}/v2.0"
#         )

#         print(f"Verified Microsoft token: {decoded_token}")

#         email = decoded_token.get("preferred_username")
#         name = decoded_token.get("name") 

#         local_jwt = jwt.encode({
#             "email": email,
#             "name": name,
#             "exp": datetime.utcnow() + timedelta(hours=8)
#         }, SECRET_KEY, algorithm="HS256")

#         print(f"Local JWT created: {local_jwt[:30]}...")

#         response = {
#             "status": True,
#             "message": "Microsoft login successful",
#             "token": local_jwt
#         }

#         print(f"Sending response: {response}")
#         return jsonify(response), 200

#     except jwt.ExpiredSignatureError:
#         print("Microsoft token expired")
#         return jsonify({"status": False, "message": "Token expired"}), 401
#     except jwt.InvalidAudienceError:
#         print("Invalid audience claim")
#         return jsonify({"status": False, "message": "Invalid audience"}), 401
#     except jwt.InvalidIssuerError:
#         print("Invalid issuer claim")
#         return jsonify({"status": False, "message": "Invalid issuer"}), 401
#     except jwt.InvalidTokenError as e:
#         print(f"Invalid token: {e}")
#         return jsonify({"status": False, "message": f"Invalid token: {str(e)}"}), 401
#     except Exception as e:
#         print(f"Unexpected server error: {e}")
#         return jsonify({"status": False, "message": f"Server error: {str(e)}"}), 500


def generate_presigned_url(bucket_name, object_key, expiration=6000):
    try:
        response = s3.generate_presigned_url(
            ClientMethod='get_object',
            Params={'Bucket': bucket_name, 'Key': object_key},
            ExpiresIn=expiration  
        )
        return response
    except ClientError as e:
        print("Error generating pre-signed URL:", e)
        return None


load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL")

llm = ChatGroq(api_key=GROQ_API_KEY, model=LLM_MODEL , temperature=0.5)
BASE_URL = os.getenv("BASE_URL")

# AWS S3 Configuration
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
AWS_BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")
AWS_REGION = os.getenv("AWS_REGION")

if not all([AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME, AWS_REGION]):
    raise ValueError("issing AWS Credentials. Check environment variables!")

s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION,
)


def upload_to_s3(file_path, bucket_name, s3_key):
    try:
        if not os.path.exists(file_path):
            return None

        content_type = mimetypes.guess_type(file_path)[0] or "application/octet-stream"

        s3.upload_file(
            file_path,
            bucket_name,
            s3_key,
            ExtraArgs={
                "ContentType": content_type,
                "ContentDisposition": "inline"
            },
        )

        return s3_key  

    except (FileNotFoundError, NoCredentialsError):
        return None
    except Exception as e:
        print("S3 upload error:", e)
        return None



def get_video_length(video_path):
    try:
        metadata = ffmpeg.probe(video_path)
        duration_in_seconds = float(metadata['format']['duration'])
        hours, remainder = divmod(duration_in_seconds, 3600)
        minutes, seconds = divmod(remainder, 60)
        return f"{int(hours):02}:{int(minutes):02}:{int(seconds):02}"
    except Exception as e:
        return None

def store_questions(cursor, section_id, questions_list, length, is_document=False, question_image_key=None):
    try:
        # If no questions to store, that's OK - just return True
        if not questions_list or len(questions_list) == 0:
            print(f"No questions to store for section {section_id} - this is allowed for manual sections")
            return True

        for idx, question in enumerate(questions_list):
            try:
                # Validate question has required fields
                if not question:
                    print(f"Empty question object at index {idx} in section {section_id}")
                    continue

                if "options" in question and isinstance(question["options"], dict):
                    options_data = question["options"]  
                else:
                    options_data = {key: question.get(key, "") for key in ["A", "B", "C", "D"]}

                if not options_data or not any(options_data.values()):
                    print(f"Warning: Question {idx} has no options, skipping")
                    continue

                options = json.dumps({
                    "A": options_data.get("A", ""),
                    "B": options_data.get("B", ""),
                    "C": options_data.get("C", ""),
                    "D": options_data.get("D", "")
                })

                answer = question.get("answer") or question.get("Answer")
                question_text = question.get("question") or question.get("Question", "")
                
                if not question_text:
                    print(f"Warning: Question {idx} has no text, skipping")
                    continue
                    
                if answer is None or str(answer).strip() == "":
                    print(f"Warning: Question {idx} has no answer, skipping")
                    continue

                storage_length = str(length) if is_document else length

                # Ping connection before each question insert to prevent timeout
                try:
                    cursor.connection.ping(reconnect=True)
                except:
                    pass

                cursor.callproc("lms_add_question", (
                    int(section_id),
                    question_text,
                    options,
                    answer
                ))

                procedure_result = cursor.fetchone()
                
                # Drain any remaining results to avoid "unread result set" error
                try:
                    while cursor.fetchone():
                        pass
                except:
                    pass

                if not procedure_result or procedure_result.get("status") != "success":
                    print(f"Warning: Database procedure returned unsuccessful status for question {idx} in section {section_id}: {procedure_result}")
                    # Don't fail the entire section for one question
                    continue
            except Exception as q_err:
                print(f"Warning: Error storing question {idx} in section {section_id}: {str(q_err)}")
                # Continue with next question instead of failing
                continue

        print(f"Completed storing questions for section {section_id}")
        return True

    except Exception as e:
        print(f"Critical error in store_questions: {str(e)}")
        import traceback
        print(traceback.format_exc())
        # Return True anyway - we don't want to fail the entire section if there's a question issue
        return True           
    
def process_section_file(content, is_video, is_document, is_manual, company_code):
    summary_text = None
    questions_list = []
    length = None
    compressed_video_key = None
    
    if is_manual == 0: 
        if is_video:
            # Import the compression function directly
            from quality_reduce import reduce_video_quality
            
            # Verify file exists
            if not os.path.exists(content):
                raise Exception(f"Video file not found: {content}")
            
            print(f"Video file confirmed at: {content}, size: {os.path.getsize(content)} bytes")
            
            # Call compression function directly instead of via HTTP
            compressed_video_key, error = reduce_video_quality(content)
            if error:
                raise Exception(f"Video compression failed: {error}")
            if not compressed_video_key:
                raise Exception("Compression did not return video key")
            
            # Call question generation function directly instead of via HTTP
            from extract_questions import process_video_task
            import uuid
            
            section_id = str(uuid.uuid4())
            try:
                result = process_video_task(content, section_id, company_code)
                questions_list = result.get("questions", [])
                summary_text = result.get("summary")
                length = result.get("length")
            except Exception as q_err:
                print(f"Warning: Question generation failed: {str(q_err)}")
                questions_list = []
                summary_text = ""
                length = get_video_length(content) or "00:00:00"
            
            if not questions_list:
                print(f"Warning: No questions generated from video, section will be created without questions")
                questions_list = []
            
            if not length:
                length = get_video_length(content) or "00:00:00"

        elif is_document:
            print(f"Processing document: {content}")
            try:
                summary_text, questions_list, length = process_document(content, company_code)
                print(f"Document processed - Questions: {len(questions_list) if questions_list else 0}, Length: {length}")
            except Exception as doc_err:
                print(f"Warning: Document processing failed: {str(doc_err)}")
                import traceback
                traceback.print_exc()
                summary_text = ""
                questions_list = []
                length = 0
            
            # Even if question generation failed, upload the document
            s3_file_name = os.path.basename(content)
            s3_key = upload_to_s3(content, AWS_BUCKET_NAME, s3_file_name)
            if not s3_key:
                raise Exception("Document S3 Upload Failed")

            compressed_video_key = s3_key
            
            if not questions_list:
                print(f"Warning: No questions generated from document, section will be created without questions")

        return summary_text, questions_list, length, compressed_video_key

    else:  
        if is_video:
            # Import and call compression function directly
            from quality_reduce import reduce_video_quality
            
            compression_result, status_code = reduce_video_quality(content)
            
            if status_code != 200:
                error_msg = compression_result.get_json().get('error', 'Unknown error')
                print(f"Video compression failed: {error_msg}")
                raise Exception(f"Video compression failed: {error_msg}")
            
            compression_data = compression_result.get_json()
            compressed_video_key = compression_data.get("compressed_video_key")
            
            if not compressed_video_key:
                raise Exception("Compression did not return video key")

        elif is_document:
            s3_file_name = os.path.basename(content)
            s3_key = upload_to_s3(content, AWS_BUCKET_NAME, s3_file_name)
            if not s3_key:
                raise Exception("Document S3 Upload Failed")
            compressed_video_key = s3_key

        return compressed_video_key


def lms_add_section():
    connection = None
    cursor = None
    temp_file_path = None

    try:
        # =========================
        # 1. INPUT EXTRACTION
        # =========================
        if request.content_type.startswith("multipart/form-data"):
            section_id = request.form.get('section_id', 0, type=int)
            module_id = request.form.get('module_id', type=int)
            section_name = request.form.get('section_name')
            description = request.form.get("description", "")
            created_by = request.form.get("created_by", type=int)
            company_code = request.form.get("company_code")
            is_manual = request.form.get("is_manual", 0, type=int)

            file_obj = request.files.get("content")

        else:
            data = request.get_json()

            section_id = data.get("section_id", 0)
            module_id = data.get("module_id")
            section_name = data.get("section_name")
            description = data.get("description", "")
            created_by = data.get("created_by")
            company_code = data.get("company_code")
            is_manual = data.get("is_manual", 0)

            file_obj = None

        # =========================
        # 2. VALIDATION
        # =========================
        if not all([module_id, section_name, created_by, company_code]):
            return jsonify({"error": "Missing required fields"}), 400

        if section_id == 0 and not file_obj:
            return jsonify({"error": "File required for new section"}), 400

        # =========================
        # 3. FILE HANDLING (SAFE)
        # =========================
        content = None
        is_video = False
        is_document = False

        if file_obj:
            from werkzeug.utils import secure_filename
            import os, tempfile, time

            filename = secure_filename(file_obj.filename)

            is_video = filename.lower().endswith(('.mp4', '.avi', '.mov', '.mkv'))
            is_document = filename.lower().endswith(('.pdf', '.txt', '.docx'))

            if not (is_video or is_document):
                return jsonify({"error": "Unsupported file type"}), 400

            temp_dir = os.path.join(tempfile.gettempdir(), 'lms_uploads')
            os.makedirs(temp_dir, exist_ok=True)

            unique_filename = f"{int(time.time())}_{filename}"
            temp_file_path = os.path.join(temp_dir, unique_filename)

            file_obj.save(temp_file_path)
            file_obj.close()

            # verify file
            if not os.path.exists(temp_file_path) or os.path.getsize(temp_file_path) == 0:
                return jsonify({"error": "File save failed"}), 400

            content = temp_file_path

        # =========================
        # 4. PROCESS FILE (OPTIONAL)
        # =========================
        summary_text = None
        auto_questions = []
        length = None
        compressed_video_key = None

        if file_obj:
            if is_manual == 0:
                summary_text, auto_questions, length, compressed_video_key = process_section_file(
                    content,
                    is_video=is_video,
                    is_document=is_document,
                    is_manual=is_manual,
                    company_code=company_code
                )
            else:
                compressed_video_key = process_section_file(
                    content,
                    is_video=is_video,
                    is_document=is_document,
                    is_manual=is_manual,
                    company_code=company_code
                )
                summary_text, auto_questions, length = "", [], None

        # =========================
        # 5. NORMALIZE LENGTH
        # =========================
        if length is None:
            storage_length = None
        elif isinstance(length, (int, float)):
            hours = int(length // 3600)
            minutes = int((length % 3600) // 60)
            seconds = int(length % 60)
            storage_length = f"{hours:02d}:{minutes:02d}:{seconds:02d}"
        elif isinstance(length, str) and ':' not in length:
            try:
                length_num = float(length)
                hours = int(length_num // 3600)
                minutes = int((length_num % 3600) // 60)
                seconds = int(length_num % 60)
                storage_length = f"{hours:02d}:{minutes:02d}:{seconds:02d}"
            except:
                storage_length = None
        else:
            storage_length = length

        # =========================
        # 6. DB CONNECTION
        # =========================
        connection = get_connection(database=company_code)
        cursor = connection.cursor()
        connection.ping(reconnect=True)

        # =========================
        # 7. CALL STORED PROCEDURE
        # =========================
        cursor.callproc(
            "lms_add_section",
            (
                section_id,
                module_id,
                section_name,
                description,
                summary_text,
                compressed_video_key,
                storage_length,
                created_by,
            ),
        )

        result = cursor.fetchone()

        if not result or result.get("status") != "success":
            connection.rollback()
            return jsonify({"error": "DB operation failed"}), 500

        new_section_id = result["section_id"]

        # =========================
        # 8. STORE QUESTIONS
        # =========================
        if auto_questions:
            try:
                store_questions(cursor, new_section_id, auto_questions, storage_length, is_document)
            except Exception as e:
                print("⚠️ Question storing failed:", e)

        connection.commit()

        return jsonify({
            "section_id": new_section_id,
            "message": "Section saved successfully"
        }), 200

    except Exception as e:
        import traceback
        print("Error in lms_add_section:", traceback.format_exc())

        if connection:
            try:
                connection.rollback()
            except:
                pass

        return jsonify({"error": str(e)}), 500

    finally:
        # =========================
        # CLEANUP
        # =========================
        if temp_file_path and os.path.exists(temp_file_path):
            try:
                os.remove(temp_file_path)
            except:
                pass

        if cursor:
            cursor.close()
        if connection:
            connection.close()

def lms_add_question():
    import json
    length = None
    is_document = None

    section_id = None
    company_code = None
    questions_list = []

    if request.is_json:
        data = request.get_json()
        section_id = data.get("section_id")
        company_code = data.get("company_code")
        questions_list = data.get("questions", [])
    else:
        section_id = request.form.get("section_id")
        company_code = request.form.get("company_code")
        try:
            questions_list = json.loads(request.form.get("questions", "[]"))
        except Exception as e:
            print(f"❌ Failed to parse questions JSON: {e}")
            return jsonify({"error": f"Invalid questions JSON: {str(e)}"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor()

    try:
        uploaded_files = request.files.getlist("images") if "images" in request.files else []

        for idx, question in enumerate(questions_list):
            question_image_key = None
            question_content = question.get("content")

            if idx < len(uploaded_files):
                image_file = uploaded_files[idx]

                temp_dir = tempfile.gettempdir()
                temp_path = os.path.join(temp_dir, image_file.filename)
                image_file.save(temp_path)

                s3_key = upload_to_s3(temp_path, AWS_BUCKET_NAME, image_file.filename)
                os.remove(temp_path)  

                if not s3_key:
                    raise Exception(f"Failed to upload file for question {idx+1}")

                question_image_key = s3_key

            elif question_content:
                print(f"⚠️ No file found for question {idx+1}, using name only: {question_content}")

            store_questions(
                cursor,
                section_id,
                [question],
                length,
                is_document,
                question_image_key
            )

        connection.commit()
        return jsonify({"message": "Questions stored successfully"}), 200

    except Exception as e:
        import traceback
        connection.rollback()
        return jsonify({"error": "Failed to store questions", "details": str(e)}), 500

    finally:
        cursor.close()
        connection.close()

            

def get_module_status(company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:

        cursor.callproc("lms_module_flag", ())
        status = cursor.fetchone()

        if not status:
            return jsonify({"error": "No modules found."}), 404

        return jsonify(status), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def lms_add_course():
    data = request.get_json(force=True) or {}
    start_ts = datetime.utcnow().isoformat()
    print(f"[lms_add_course START] {start_ts}")
    print(f"[lms_add_course PAYLOAD_KEYS] {list(data.keys())}")

    if not data:
        print("[lms_add_course] Empty JSON body")
        return jsonify({"error": "JSON body required"}), 400

    company_code = data.get("company_code")
    if not company_code:
        print("[lms_add_course] company_code missing in payload")
        return jsonify({"error": "company_code is required"}), 400

    # Validate required fields
    required_fields = ["course_name", "description", "instructor_id", "category", "difficulty_level", "prerequisites", "tags", "created_by"]
    missing = [f for f in required_fields if data.get(f) in (None, "")]
    if missing:
        print(f"[lms_add_course] Missing fields: {missing}")
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    try:
        instructor_id = int(data.get("instructor_id"))
    except Exception:
        print(f"[lms_add_course] instructor_id invalid: {data.get('instructor_id')}")
        return jsonify({"error": "instructor_id must be an integer"}), 400

    course_id = data.get("course_id", 0)
    course_name = data.get("course_name")
    description = data.get("description")
    category = data.get("category")
    difficulty_level = data.get("difficulty_level")
    prerequisites = data.get("prerequisites")
    thumbnail = data.get("thumbnail") or None
    tags = data.get("tags")
    created_by = data.get("created_by")

    # Show DB variants we'll try
    try:
        variants = get_variants(company_code)
    except Exception as e:
        variants = [company_code]
    print(f"[lms_add_course] company_code={company_code}, db_variants={variants}")

    connection = None
    cursor = None
    try:
        print(f"[lms_add_course] Attempting DB connection for {company_code}")
        connection = get_connection(database=company_code)
        print(f"[lms_add_course] DB connection established for {company_code}")
        cursor = connection.cursor()

        print(f"[lms_add_course] Calling stored procedure lms_add_course with course_name='{course_name}' created_by={created_by}")
        cursor.callproc("lms_add_course", (
            course_id, course_name, description, instructor_id, category,
            difficulty_level, prerequisites, thumbnail, tags, created_by
        ))

        # Fetch result before committing and drain additional resultsets
        result = cursor.fetchone()
        print(f"[lms_add_course] Raw proc result: {result}")
        try:
            while cursor.fetchone():
                pass
        except:
            pass

        connection.commit()
        end_ts = datetime.utcnow().isoformat()
        print(f"[lms_add_course END] {end_ts}")

        if result and result.get("course_id") is not None:
            print(f"[lms_add_course] Success: course_id={result.get('course_id')}")
            return jsonify({
                "course_id": result.get("course_id"),
                "message": result.get("message", "")
            }), 200
        else:
            print(f"[lms_add_course] Unexpected DB result after proc: {result}")
            return jsonify({"error": "Unexpected error: No response from stored procedure"}), 500

    except Exception as e:
        if connection:
            connection.rollback()
        import traceback
        traceback.print_exc()
        print(f"[lms_add_course ERROR] company_code={company_code}, payload_keys={list(data.keys())}, error={e}")
        return jsonify({"error": "Server error"}), 500

    finally:
        try:
            if cursor:
                cursor.close()
        except Exception:
            pass
        try:
            if connection:
                connection.close()
        except Exception:
            pass
        

def lms_add_module():
    data = request.get_json()
    company_code = data.get("company_code")
    if not company_code:
        return jsonify({"response": "company_code is required"})
    
    module_id = data.get('module_id', 0)  
    course_id = data.get('course_id')
    module_name = data.get('module_name')
    description = data.get('description')
    created_by = data.get('created_by')
 
    if not course_id or not module_name:
        return jsonify({"response": "All fields are required"})
 
    connection = None
    try:
        connection = get_connection(database=company_code)
        cursor = connection.cursor()
    
        cursor.execute("SELECT COUNT(*) AS count FROM lms_course WHERE id = %s", (course_id,))
        result = cursor.fetchone()
        if not result or result["count"] == 0:
            return jsonify({"response": "Course not found!"})
  
        if module_id > 0:
            cursor.execute("SELECT COUNT(*) AS count FROM lms_modules WHERE id = %s", (module_id,))
            result = cursor.fetchone()
            if result["count"] == 0:
                return jsonify({"response": "Module not found!"})
 
        cursor.callproc("lms_add_module",
                        (module_id, course_id, module_name, description, created_by))
 
        connection.commit()
 
        result = cursor.fetchone()
        if result:
            return jsonify({
                "module_id": result["module_id"],  
                "message": result["message"]
            }), 200
        else:
            return jsonify({"error": "Unexpected error: No response from stored procedure"}), 500
 
    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500
 
    finally:
        if connection:
            cursor.close()
            connection.close()

def upload_fileobj_to_s3(fileobj, bucket, key):

    try:
        s3.upload_fileobj(fileobj, bucket, key)
        return f"https://{bucket}.s3.amazonaws.com/{key}"
    except Exception as e:
        app.logger.error("S3 upload failed: %s", e)
        return None
    
def lms_add_resource():
    try:
        if request.content_type.startswith('multipart/form-data'):
            section_id    = request.form.get('section_id')
            resource_name = request.form.get('resource_name')
            created_by    = request.form.get('created_by')
            company_code  = request.form.get('company_code')
            file          = request.files.get('resource_content')

            if not all([section_id, resource_name, created_by, file, company_code]):
                return jsonify(error="Missing required fields for multipart upload"), 400

            connection = get_connection(database=company_code)
            cursor = connection.cursor()

            key = f"resources/{file.filename}"
            s3_url = upload_fileobj_to_s3(file, AWS_BUCKET_NAME, key)
            if not s3_url:
                print("file is not uploaded to s3 bucket")
                return jsonify(error="File upload failed"), 500

            cursor.callproc("lms_course_resource",
                            (section_id, resource_name, s3_url, created_by))
            connection.commit()

        elif request.content_type.startswith('application/json'):
            resources = request.get_json(force=True)
            print(resources)

            if not resources or not isinstance(resources, list):
                return jsonify(error="Invalid or missing 'resources' list"), 400

            company_code = resources[0].get('company_code')
            connection = get_connection(database=company_code)
            cursor = connection.cursor()

            for item in resources:
                section_id       = item.get('section_id')
                resource_name    = item.get('resource_name')
                resource_content = item.get('resource_content')
                created_by       = item.get('created_by')

                if None in (section_id, resource_name, resource_content, created_by):
                    return jsonify(error="All fields are required"), 400

                # ✅ Handle URL
                if isinstance(resource_content, str) and resource_content.startswith("http"):
                    s3_url = resource_content

                # ✅ Handle local file
                elif os.path.exists(resource_content):
                    filename = os.path.basename(resource_content)
                    s3_url = upload_to_s3(resource_content, AWS_BUCKET_NAME, f"resources/{filename}")
                    if not s3_url:
                        return jsonify(error=f"Failed to upload file: {filename}"), 500

                else:
                    return jsonify(error="Invalid resource content"), 400

                # ✅ NO json.dumps
                cursor.callproc(
                    "lms_course_resource",
                    (section_id, resource_name, s3_url, created_by)
                )
            connection.commit()

        else:
            return jsonify(error="Unsupported Content-Type"), 415

        return jsonify(message="Resources added successfully"), 200

    except Exception as e:
        import traceback
        traceback.print_exc()   # 🔥 FULL ERROR TRACE
        return jsonify(error=str(e)), 500


def title_content():
    data = request.get_json()
    title = data.get("title")

    ai_prompt = (
        "You are an AI-powered course content generator. "
        "Given the course title: " + json.dumps(title) + 
        ", generate the following details:\n"
        "1. A list of 5 meaningful and relevant tags based on the course domain. "
        "Tags may include programming languages, frameworks, technologies, "
        "academic subjects (e.g., Mathematics, Physics), theories, tools, or key concepts depending on the title.\n"
        "2. A short and concise list of prerequisites (avoid lengthy descriptions). "
        "3. A compelling and informative 200 to 250 characters  course description "
        "Ensure the description is within this range by adjusting wording while maintaining clarity. "
        "ONLY return a JSON object in the following format: "
        '{"tags": ["tag1", "tag2", "tag3"], '
        '"prerequisites": ["prerequisite1", "prerequisite2", "prerequisite3"], '
        '"description": "A well-crafted course description that is between 200 to 250 characters."} '
        "Do NOT include any explanations or extra text."
    )

    response = llm.invoke(ai_prompt)  
    response_text = response.content if hasattr(response, 'content') else str(response)

    try:
        response_json = json.loads(response_text)

    except json.JSONDecodeError:
        return jsonify({"error": "Invalid response from LLM"}), 500

    return jsonify(response_json)

def modules_content():
    data = request.get_json()
    course_name = data.get("course_name")  
    module_name = data.get("module_name")

    ai_prompt = (
        "You are an AI-powered module content generator. "
        "Given the course name: " + json.dumps(course_name) + 
        " and the module name: " + json.dumps(module_name) + 
        ", generate a highly relevant and specific module description. "
        "The description should clearly explain what the module covers in relation to the course. "
        "Ensure it is engaging and informative, while STRICTLY keeping it between 200 to 250 characters. "
        "ONLY return a JSON object in the following format: "
        '{"description": "A well-crafted module description specific to the module name and course name, between 200 to 250 characters."} '
        "Do NOT include any explanations or extra text."
    )
 
    response = llm.invoke(ai_prompt)  
    response_text = response.content if hasattr(response, 'content') else str(response)
    try:
        response_json = json.loads(response_text)
    
    except json.JSONDecodeError:
            return jsonify({"error": "Invalid response from LLM"}), 500

    return jsonify(response_json)
    
def sections_content_generation():
    data = request.get_json()
    course_name = data.get("course_name")  
    module_name = data.get("module_name")
    section_name = data.get("section_name")

    ai_prompt = (
        "You are an AI-powered module content generator. "
        "Given the course name: " + json.dumps(course_name) + 
        ", module name: " + json.dumps(module_name) + 
        ", and section name: " + json.dumps(section_name) + 
        ", generate a highly relevant and specific module description. "
        "The description should clearly explain what the module covers in relation to the course. "
        "Ensure it is engaging and informative, while STRICTLY keeping it between 200 to 250 characters. "
        "ONLY return a JSON object in the following format: "
        '{"description": "A well-crafted module description specific to the module name and course name, between 200 to 250 characters."} '
        "Do NOT include any explanations or extra text."
    )
    response = llm.invoke(ai_prompt)  
    response_text = response.content if hasattr(response, 'content') else str(response)
    try:
        response_json = json.loads(response_text)

    except json.JSONDecodeError:
            return jsonify({"error": "Invalid response from LLM"}), 500

    return jsonify(response_json)    
    

LLM_INVOKE_SUPPORTS_PARAMS = True

def get_sections_content(
    field_name,
    course_name,
    module_name,
    section_name,
    min_length=150,
    max_retries=3
    ):
    instruction = {
        "description": (
            "Write a detailed and learner-friendly explanation of the section titled "
            f"'{section_name}' from the module '{module_name}' in the course '{course_name}'. "
            "Explain what the learner will study, why this topic is important, and how it "
            "connects to the overall course. Use clear language and real context. "
            "Write 3–4 short paragraphs. Target 200–300 words."
        ),
        "concepts": (
            "Explain the core concepts of the section "
            f"'{section_name}' as taught in the module '{module_name}' of the course '{course_name}'. "
            "Use numbered or bulleted points. For each concept, include a brief explanation "
            "and its relevance or purpose. Provide at least 5–7 concepts with meaningful detail. "
            "Target 200–250 words."
        ),
        "examples": (
            "Provide 2–3 practical, real-world, or industry-relevant examples that demonstrate "
            f"how '{section_name}' is applied in practice within the context of '{course_name}'. "
            "Clearly explain each example step by step and relate it back to the concepts "
            "covered in the module '{module_name}'. Target 150–200 words."
        ),
        "learning_resources": (
            "List 3–5 high-quality learning resources related to "
            f"'{section_name}' in the course '{course_name}'. "
            "Each resource must include a valid URL and a 1–2 sentence explanation describing "
            "what the learner will gain from it. Prefer official documentation, tutorials, "
            "or trusted educational platforms. Target 120–180 words."
        )
    }

    prompt = (
        f"You are an AI-powered LMS assistant.\n\n"
        f"Course: {course_name}\n"
        f"Module: {module_name}\n"
        f"Section: {section_name}\n\n"
        f"{instruction[field_name]}\n\n"
        "Return only plain text. Do not use markdown, JSON, or headings."
    )

    for attempt in range(1, max_retries + 1):
        try:
            if LLM_INVOKE_SUPPORTS_PARAMS:
                response = llm.invoke(
                    prompt,
                    temperature=0.4,
                    max_tokens=600
                )
            else:
                response = llm.invoke(prompt)

            content = response.content if hasattr(response, "content") else str(response)
            content = content.strip()

            if len(content) >= min_length:
                return content

            time.sleep(2 ** attempt)

        except Exception as e:
            print(f"[{field_name} retry {attempt}] {e}")
            time.sleep(2 ** attempt)

    fallback = {
        "description": (
            f"This section introduces the core ideas of {section_name}. "
            f"It explains why the topic matters in the context of {course_name} "
            "and how it helps learners build a strong foundation."
        ),
        "concepts": (
            f"• Overview of {section_name}\n"
            "• Key terminology and basic principles\n"
            "• How the concept is used in real scenarios"
        ),
        "examples": (
            f"A simple example of {section_name} is shown through a real-world "
            "use case to help learners understand how the concept is applied."
        ),
        "learning_resources": (
            "https://en.wikipedia.org\n"
            "https://developer.mozilla.org"
        )
    }

    return fallback[field_name]


def sections_content():
    data = request.get_json()

    course_name = data.get("course_name", "Course")
    module_name = data.get("module_name", "Module")
    section_name = data.get("section_name", "Section")

    result = {}
    text_fields = [
        "description",
        "concepts",
        "examples",
        "learning_resources"
    ]

    for field in text_fields:
        content = get_sections_content(
            field,
            course_name,
            module_name,
            section_name,
            min_length=200
        )

        result[field] = html.escape(content).replace("\n", "<br>")

    combined_html = f"""
<style>
.pdf-section {{
    page-break-inside: avoid;
    break-inside: avoid;
    margin-bottom: 20px;
}}

h2, h3 {{
    page-break-after: avoid;
}}

pre {{
    page-break-inside: avoid;
    white-space: pre-wrap;
    word-wrap: break-word;
}}
</style>

<div style='font-family:Segoe UI,Arial,sans-serif;line-height:1.6'>
    <h3>Course: {html.escape(course_name)}</h3>

    <div class="pdf-section">
        <h2>Description</h2>
        <p>{result['description']}</p>
    </div>

    <div class="pdf-section">
        <h2>Key Concepts</h2>
        <p>{result['concepts']}</p>
    </div>

    <div class="pdf-section">
        <h2>Examples</h2>
        <p>{result['examples']}</p>
    </div>


    <div class="pdf-section">
        <h2>Learning Resources</h2>
        <p>{result['learning_resources']}</p>
    </div>
</div>
"""

    result["description"] = combined_html

    return jsonify(result), 200



def get_course_duration(course_id, cursor):
    try:
        cursor.callproc("lms_calculate_course_duration", (course_id,))
        result = cursor.fetchone() 
        
        if result and "course_duration" in result:
            return str(result["course_duration"])  
        
        return "00:00:00"  
    except Exception as e:
        return "00:00:00"

def get_courses(course_ids, user_id, category_id, difficulty_level_id, time_filter_id, instructor_id, status_id, company_code):
    # limit = request.args.get('limit', type=int, default=10)
    # offset = request.args.get('offset', type=int, default=0)
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400
    
    try:
        if course_ids.startswith("[") and course_ids.endswith("]"):
            course_ids = course_ids.strip("[]").replace(" ", "") or "0"

        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        cursor.callproc("lms_get_courses", (
            course_ids,
            user_id,
            category_id,
            difficulty_level_id,
            time_filter_id,
            instructor_id,
            status_id
        ))
        courses = cursor.fetchall()

        if not courses:
            return jsonify({"error": "No courses found."}), 200

        for course in courses:
            course["course_duration"] = course.get("course_duration", "00:00:00")

            if "thumbnail" in course and isinstance(course["thumbnail"], bytes):
                course["thumbnail"] = course["thumbnail"].decode("utf-8")
            else:
                course["thumbnail"] = None

            if "is_enrolled" in course:
                del course["is_enrolled"]

        return jsonify({"courses": courses}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


def get_published_courses(course_ids, user_id, category_id, difficulty_level_id, time_filter_id, instructor_id, status_id, company_code):
    # limit = request.args.get('limit', type=int, default=10)
    # offset = request.args.get('offset', type=int, default=0)
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400
    
    try:
        if course_ids.startswith("[") and course_ids.endswith("]"):
            course_ids = course_ids.strip("[]").replace(" ", "") or "0"

        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        cursor.callproc("lms_get_published_courses", (
            course_ids,
            user_id,
            category_id,
            difficulty_level_id,
            time_filter_id,
            instructor_id,
            status_id
        ))
        courses = cursor.fetchall()
        if not courses:
            return jsonify({"error": "No courses found."}), 200

        for course in courses:
            course["course_duration"] = course.get("course_duration", "00:00:00")

            if "thumbnail" in course and isinstance(course["thumbnail"], bytes):
                course["thumbnail"] = course["thumbnail"].decode("utf-8")
            else:
                course["thumbnail"] = None

            if "is_enrolled" in course:
                del course["is_enrolled"]

        return jsonify({"courses": courses}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


def get_module_duration(module_id, cursor):
    try:
        cursor.callproc("lms_calculate_module_duration", (module_id,))
        result = cursor.fetchone()
        return str(result["module_duration"]) if result and "module_duration" in result else "00:00:00"
    except Exception as e:
        return "00:00:00"

def get_modules(module_id, course_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:

        cursor.callproc("lms_get_modules", (module_id, course_id))
        modules = cursor.fetchall()

        if not modules:
            return jsonify({"error": "No modules found."}), 404

        return jsonify({"modules": modules}), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

 
def get_section_duration(section_id, cursor):
    try:
        cursor.callproc("lms_calculate_section_duration", (section_id,))
        result = cursor.fetchone()

        if result and "section_duration" in result:
            section_duration = result["section_duration"]

            if isinstance(section_duration, timedelta):
                converted_duration = str(section_duration)
                return converted_duration  

        return "00:00:00"  

    except Exception as e:
        return "00"

def get_sections(user_id, section_id, module_id, role_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.callproc("lms_get_sections", (user_id, section_id, module_id, role_id))
        sections = cursor.fetchall()

        if not sections:
            return jsonify({"error": "No sections found."}), 200

        for section in sections:
            section_duration = get_section_duration(section["id"], cursor)

            if isinstance(section["content_length"], timedelta):
                section["content_length"] = str(section["content_length"])

            if "content" in section and section["content"]:
                original_key = section["content"]
                file_ext = os.path.splitext(original_key)[1].lower() 

                section["content"] = generate_presigned_url(AWS_BUCKET_NAME, original_key)

                if file_ext in ['.pdf', '.doc', '.docx']:
                    section["content_type"] = "document"
                elif file_ext in ['.mp4', '.mov', '.avi', '.mkv']:
                    section["content_type"] = "video"
                elif file_ext in ['.jpg', '.jpeg', '.png', '.gif']:
                    section["content_type"] = "image"
                else:
                    section["content_type"] = "other"
            else:
                section["content_type"] = "none"

        return jsonify({"sections": sections}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


def send_email(to_email, subject, body):
    try:
        msg = MIMEMultipart()
        msg["From"] = SMTP_USER
        msg["To"] = to_email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "html"))


        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, to_email, msg.as_string())

        return True

    except Exception as e:
        
        return False

def assign_course():
    connection = None
    cursor = None
    try:
        data = request.get_json()
        company_code = data.get("company_code")
        user_ids = data.get("user_id")
        course_id = data.get("course_id")
        assigned_by = data.get("assigned_by")
        is_mandatory = data.get("is_mandatory")
        due_date = data.get("due_date")

        if not company_code:
            return jsonify({"error": "company_code is required"}), 400
        if not user_ids or not course_id or not assigned_by:
            return jsonify({"error": "All fields are required"}), 400
        if not isinstance(user_ids, list):
            return jsonify({"error": "user_id must be a list"}), 400

        user_ids_str = ",".join(map(str, user_ids))
        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        cursor.callproc("lms_assign_course", (user_ids_str, course_id, is_mandatory, due_date, assigned_by,))
        assignment_result = cursor.fetchall()

        start_date = datetime.now().strftime("%Y-%m-%d")

        cursor.execute("SELECT course_name FROM lms_course WHERE id = %s", (course_id,))
        course_row = cursor.fetchone()
        course_name = course_row["course_name"] if course_row else "Unknown Course"

        newly_assigned_user_ids = [
            result["user_id"]
            for result in assignment_result
            if "Already" not in result.get("message", "")
        ]

        if not newly_assigned_user_ids:
            print("No new users assigned — skipping email sending.")
            return jsonify({
                "course_id": course_id,
                "assigned_by": assigned_by,
                "assignment_results": assignment_result,
                "email_results": []
            }), 200

        format_strings = ",".join(["%s"] * len(newly_assigned_user_ids))
        cursor.execute(f"""
            SELECT e.id AS user_id,
                e.firstname, e.middlename, e.lastname,
                e.officeemail,
                r.name AS role_name
            FROM employee e
            LEFT JOIN employee_roles er
                ON er.employee_id = e.id
            LEFT JOIN rolesmaster r
                ON r.id = er.role_id
            WHERE e.id IN ({format_strings})
            AND er.effective_from_date = (
                SELECT MAX(er2.effective_from_date)
                FROM employee_roles er2
                WHERE er2.employee_id = e.id
                    AND (er2.effective_to_date IS NULL OR er2.effective_to_date >= CURDATE())
            )
        """, tuple(newly_assigned_user_ids))

        rows = cursor.fetchall()
        

        users = {}
        for row in rows:
            if row["user_id"] not in users:
                users[row["user_id"]] = row
        users = list(users.values())

        email_results = []

        for user in users:
            fullname = " ".join(filter(None, [user.get("firstname"), user.get("middlename"), user.get("lastname")]))
            role_name = user.get("role_name") or "Staff"

            if not user["officeemail"]:
                email_results.append({
                    "user_id": user["user_id"],
                    "email": None,
                    "course": course_name,
                    "status": "skipped - no email"
                })
                continue

            subject = "New Course Assigned to You – Let’s Get Started!"
            body = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <p>Hi {fullname},</p>
                <p>A new learning opportunity has been assigned to you in our Learning Management System (LMS). 🎓</p>
                <p><b>Course Title:</b> {course_name}<br>
                <b>Start Date:</b> {start_date}<br>
                <b>Completion Deadline:</b> {due_date}</p>
                <p>This course is designed to help you enhance your skills and knowledge. 
                Please log in to the LMS using your credentials and begin at your convenience.</p>
                <p>👉 <a href="https://sreeb.spryple.com/" target="_blank">Login here</a></p>
                <p>We encourage you to complete the course by the due date to stay on track with your learning goals. 
                If you face any issues accessing the course, please reach out to HR or Support.</p>
                <p>Happy learning and growing!</p>
                <p>Best Regards,<br>
                {fullname}<br>
                {role_name}<br>
                {company_code}</p>
            </body>
            </html>
            """

            success = send_email(user["officeemail"], subject, body)
            email_results.append({
                "user_id": user["user_id"],
                "email": user["officeemail"],
                "course": course_name,
                "status": "sent" if success else "failed"
            })

        connection.commit()

        return jsonify({
            "course_id": course_id,
            "assigned_by": assigned_by,
            "assignment_results": assignment_result,
            "email_results": email_results
        }), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            
def manager_stats_pie(branch_id, manager_id, department_id, employee_id, start_date, end_date, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        if branch_id is None or  manager_id is None or department_id is None or employee_id is None or not start_date or not end_date:
            return jsonify({"error": "All fields are required"}), 400
        
        department_id_str = "".join(str(x) for x in department_id)
        manager_id_str = "".join(str(x) for x in manager_id)
        branch_id_str = "".join(str(x) for x in branch_id)
        employee_id_str = "".join(str(x) for x in employee_id)


        cursor.callproc("lms_manager_dashboard_piechart", (branch_id_str, manager_id_str, department_id_str, employee_id_str, start_date, end_date))

        result = cursor.fetchone()  

        if not result:
            return jsonify({"error": "No data returned from stored procedure"}), 500

        return jsonify({
            "Total Enrolled Courses": result.get("Total_Enrolled_Courses", 0),
            "Total Assigned Courses": result.get("Total_Assigned_Courses", 0),
            "Total Completed Courses": result.get("Total_Completed_Courses", 0)
        })

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            
def mgremp_dashboard(branch_id, manager_id, department_id, employee_id, start_date, end_date, company_code):

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    try:
        cursor.callproc("lms_empdashboard_overview", 
                (branch_id, manager_id, department_id, employee_id, start_date, end_date))

        summary = cursor.fetchall()

        cursor.nextset()
        enrolled = cursor.fetchall()

        cursor.nextset()
        not_enrolled = cursor.fetchall()

        cursor.nextset()
        not_completed = cursor.fetchall()

        cursor.nextset()
        completed = cursor.fetchall()

        return jsonify({
            "summary": summary[0] if summary else {},
            "enrolled": enrolled,
            "not_enrolled": not_enrolled,
            "not_completed": not_completed,
            "completed": completed
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        connection.close()
            
def progress_reports(branch_id, dept_id, manager_id, emp_id, from_date, to_date, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
       if branch_id is None or dept_id is None or manager_id is None or emp_id is None:
           return jsonify({"error" : "all fields must be required"})
       
       department_id_str = "".join(str(x) for x in dept_id)
       manager_id_str = "".join(str(x) for x in manager_id)
       branch_id_str = "".join(str(x) for x in branch_id)
       emp_ids = "".join(str(x) for x in emp_id)
       
       cursor.callproc("lms_get_reports",(branch_id_str, department_id_str, manager_id_str, emp_ids, from_date, to_date))
       result = cursor.fetchall()
       if not result:
           return jsonify({"data" : "No records found"})
            
       return jsonify(result)
       
    except Exception as e:
       if connection:
           connection.rollback()
       return jsonify({"error" : str(e)}), 500
   
    finally:
       if cursor:
           cursor.close()
       if connection:
            connection.close()
     

def superadmin_dashboard(branch_id, department_id, from_date, to_date,  company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        if any(v is None for v in [branch_id, department_id, from_date, to_date]):
            return jsonify({"error": "All parameters are required"}), 400
        
        department_id_str = "".join(str(x) for x in department_id)
        branch_id_str = "".join(str(x) for x in branch_id)

        cursor.execute("SET SQL_SAFE_UPDATES = 0")

        cursor.callproc("lms_superadmin_dashboard", (branch_id_str, department_id_str, from_date, to_date))

        result_data = []
        
        while True:
            result = cursor.fetchone()
            if result:
                result_data.append(result)
            else:
                if cursor.nextset():
                    continue
                break

        cursor.execute("SET SQL_SAFE_UPDATES = 1")

        if not result_data:
            return jsonify({"message": "No data found"}), 404
        for row in result_data:
            if 'completion_rate' in row and row['completion_rate'] is not None:
                row['completion_rate'] = int(row['completion_rate'])
            if 'enrollment_rate' in row and row['enrollment_rate'] is not None:
                row['enrollment_rate'] = float(row['enrollment_rate'])

        return jsonify(result_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

            
def get_userpoints(user_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        if user_id is None:
            return jsonify ({"error" : "user id is required"})
        cursor.callproc("lms_get_userpoints",(user_id,))
        result = cursor.fetchone()
        
        if not result:
            return jsonify({"error" : "No data found for this procedure"})
        return jsonify(result)
    except Exception as e:
        return jsonify({"error" : str(e)}), 500
    
    finally :
       if cursor :
           cursor.close()
       if connection :
            connection.close()
            
def get_deptmanagers(dept_ids, branch_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    def normalize_input(input_val):
        if input_val in [0, '0', "'0'", '"0"']:
            return "0"

        if isinstance(input_val, str):
            input_val = input_val.strip("[]'\" ")  
            return input_val if input_val else "0"

        if isinstance(input_val, (list, tuple)):
            cleaned = [str(x).strip(" '\"") for x in input_val if str(x).strip()]
            if len(cleaned) == 1 and cleaned[0] == "0":
                return "0"
            return ",".join(cleaned)

        return str(input_val).strip() or "0"

    try:
        print(dept_ids, branch_id)
        department_id_str = normalize_input(dept_ids)
        branch_id_str = normalize_input(branch_id)
    except Exception as e:
        return jsonify({"error": f"Invalid input format: {str(e)}"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    try:
        cursor.callproc("lms_get_deptmanagers", (department_id_str, branch_id_str))
        result = cursor.fetchall()
        if not result:
            return jsonify({"message": "No managers found for the selected departments."})

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def fetch_employees_by_managers(manager_ids, course_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400
    if not course_id or course_id.lower() == "null":
        course_id = None

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        if manager_ids.startswith("[") and manager_ids.endswith("]"):
            manager_ids = manager_ids.strip("[]").replace(" ", "") or "0"
        elif not manager_ids:
            manager_ids = "0"

        cursor.callproc("lms_get_mngempids", (manager_ids, course_id))
        result = cursor.fetchall()

        if not result:
            return jsonify({"message": "No employees found for selected managers."})
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


def section_summary(section_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400
    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        
        cursor.execute("SELECT summary from lms_sections where id = %s", (section_id,))
        result = cursor.fetchone()

        if not result:
            return jsonify({"message": "No data found for this section id"}), 404

        return jsonify({
            "performance_stats": result
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


def manager_stats_line(employee_id, time_filter_id, manager_id, department_id, branch_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    try:
        if any(v is None for v in [employee_id, time_filter_id, manager_id, department_id, branch_id]):
            return jsonify({"error": "All parameters are required"}), 400
        
        department_id_str = "".join(str(x) for x in department_id)
        manager_id_str = "".join(str(x) for x in manager_id)
        branch_id_str = "".join(str(x) for x in branch_id)
        employee_id_str = "".join(str(x) for x in employee_id)

        cursor.callproc("lms_manager_linechart", (employee_id_str, time_filter_id, manager_id_str, department_id_str, branch_id_str))

        result_data = []
        while True:
            result = cursor.fetchone()
            if result:
                result_data.append(result)
            else:
                if cursor.nextset():
                    continue
                break

        if not result_data:
            return jsonify({"message": "No data found"}), 404

        return jsonify({"completed_sections": result_data})

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            
def get_badge_stats_by_category(user_id, manager_id, department_id, branch_id, from_date, to_date, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        
        if any(v is None for v in [user_id, manager_id, department_id, branch_id, from_date, to_date]):
            return jsonify({"error": "All parameters are required"}), 400
        
        department_id_str = "".join(str(x) for x in department_id)
        manager_id_str = "".join(str(x) for x in manager_id)
        branch_id_str = "".join(str(x) for x in branch_id)
        user_id_str = "".join(str(x) for x in user_id)

        cursor.callproc("lms_get_manager_statsbadges", (user_id_str, manager_id_str, department_id_str, branch_id_str, from_date, to_date))

        result_data = []
        while True:
            result = cursor.fetchone()
            if result:
                result_data.append(result)
            else:
                if cursor.nextset():
                    continue
                break

        if not result_data:
            return jsonify({"message": "No badge data found"}), 200

        return jsonify({"badge_stats_by_category": result_data})

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def save_points_details():
    data = request.get_json()
    company_code = data.get("company_code")
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)  

    try:
        user_id = int(data.get("user_id"))
        section_id = int(data.get("section_id"))
        acquired_points = float(data.get("acquired_points"))
        total_test_points = float(data.get("total_test_points"))

        if any(v is None for v in [user_id, section_id, acquired_points, total_test_points]):
             return jsonify({"error": "Missing required fields"}), 400

        cursor.execute(
            "CALL lms_save_points_details(%s, %s, %s, %s)",
            (user_id, section_id, acquired_points, total_test_points)
        )

        result = cursor.fetchone()
        is_passed = result["pass_status"] if result and "pass_status" in result else 0

        connection.commit()

        return jsonify({
            "message": "Points details saved successfully",
            "is_passed": is_passed
        }), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        connection.close()


def get_user_dashboard(user_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor) 
    try:
        if not user_id:
            user_id = request.args.get("user_id", type=int)

        if not user_id:
            return jsonify({"error": "User ID is required"}), 400

        cursor.callproc("lms_get_enrolled_courses", (user_id,))
        enrolled_courses = cursor.fetchall() or []

        for course in enrolled_courses:
            course_id = course["id"]

            cursor.execute("""
                SELECT COUNT(*) AS total_sections
                FROM lms_sections ls
                INNER JOIN lms_modules lm ON ls.module_id = lm.id
                WHERE lm.course_id = %s
            """, (course_id,))
            total_sections = cursor.fetchone()["total_sections"] or 0

            cursor.execute("""
                SELECT COUNT(DISTINCT pd.section_id) AS completed_sections
                FROM lms_points_details pd
                INNER JOIN lms_sections ls ON pd.section_id = ls.id
                INNER JOIN lms_modules lm ON ls.module_id = lm.id
                WHERE lm.course_id = %s AND pd.user_id = %s AND pd.is_passed = 1
            """, (course_id, user_id))
            completed_sections = cursor.fetchone()["completed_sections"] or 0

            course["total_sections"] = total_sections
            course["completed_sections"] = completed_sections

        enrolled_courses = process_courses(enrolled_courses)

        cursor.callproc("lms_get_assigned_courses", (user_id,))
        assigned_courses = process_courses(cursor.fetchall() or [])

        cursor.callproc("lms_get_all_courses")
        all_courses = process_courses(cursor.fetchall() or [])

        if enrolled_courses:
            base_courses = enrolled_courses
        else:
            base_courses = assigned_courses  

        base_course_names = [course['course_name'] for course in base_courses]
        available_course_names = [course['course_name'] for course in all_courses]

        ai_prompt = (
            "You are an AI-powered course recommendation system. "
            "The user is currently enrolled in the following courses: " + json.dumps(base_course_names) +
            ". Based on category or subject matter, recommend similar courses from this list and strictly don't include enrolled courses in recommended courses include only unenrolled and similar category of courses: " +
            json.dumps(available_course_names) +
            ". ONLY return a JSON array of recommended course names, like this: "
            '["Data Science", "Machine Learning", "Cloud Computing"]. '
            "Do NOT include any explanation or extra text."
        )

        response = llm.invoke(ai_prompt)

        if hasattr(response, "content"):  
            raw_content = response.content
        elif isinstance(response, dict) and "content" in response:
            raw_content = response["content"]
        else:
            raise ValueError(f"Invalid LLM response format: {response}")

        recommended_course_names = parse_llm_response(raw_content)

        if isinstance(recommended_course_names, dict) and "error" in recommended_course_names:
            return jsonify(recommended_course_names), 500

        if not isinstance(recommended_course_names, list):
            recommended_course_names = []

        recommended_courses = process_courses([
            course for course in all_courses if course['course_name'] in recommended_course_names
        ])

        cursor.callproc("lms_get_trending_courses")
        trending_courses = process_courses(cursor.fetchall() or [])

        cursor.callproc("lms_get_popular_courses")
        popular_courses = process_courses(cursor.fetchall() or [])

        return jsonify([
            {
                "category_name": "assigned_courses",
                "courses": assigned_courses
            },
            {
                "category_name": "recommended_courses",
                "courses": recommended_courses
            },
            {
                "category_name": "enrolled_courses",
                "courses": enrolled_courses
            },
            {
                "category_name": "trending_courses",
                "courses": trending_courses
            },
            {
                "category_name": "popular_courses",
                "courses": popular_courses
            }
        ]), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            
def manager_recommendations(manager_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    try:
        if not manager_id:
            return jsonify({"error": "manager ID is required"}), 400

        cursor.callproc("lms_get_all_courses")
        all_courses = process_courses(cursor.fetchall() or [])
        seen = set()
        unique_courses = []
        for course in all_courses:
            name_lower = course['course_name'].strip().lower()
            if name_lower not in seen:
                seen.add(name_lower)
                unique_courses.append(course['course_name'])
        available_course_names = unique_courses

        cursor.callproc("lms_managerwise_recommendation", (manager_id,))
        department_name = cursor.fetchall()

        ai_prompt = (
            "You are an AI-powered course recommendation system. "
            "Department: " + json.dumps(department_name) + ". "
            "Recommend up to 20 relevant courses from this exact list: " +
            json.dumps(available_course_names) + ". "
            "You MUST respond with ONLY a raw JSON array of course name strings. "
            "Example of valid response: [\"Python\", \"Django\", \"SQL\"]. "
            "Do NOT wrap in an object. Do NOT use keys like 'recommended_courses'. "
            "Do NOT use markdown or code blocks. Just the array."
        )

        response = llm.invoke(ai_prompt)

        if hasattr(response, "content"):
            raw_content = response.content.strip()
        elif isinstance(response, dict) and "content" in response:
            raw_content = response["content"].strip()
        else:
            raise ValueError(f"Invalid LLM response format: {response}")

        print("Raw LLM output:", raw_content)

        recommended_course_names = []

        try:
            parsed = json.loads(raw_content)
            if isinstance(parsed, list):
                recommended_course_names = parsed
            elif isinstance(parsed, dict):
                for value in parsed.values():
                    if isinstance(value, list):
                        recommended_course_names = value
                        break

        except json.JSONDecodeError:
            match = re.search(r"\[.*?\]", raw_content, re.DOTALL)
            if match:
                try:
                    recommended_course_names = json.loads(match.group(0))
                except json.JSONDecodeError:
                    recommended_course_names = re.findall(r'"([^"]+)"', raw_content)

        print("Parsed course names:", recommended_course_names)
        name_lookup = {name.lower() for name in recommended_course_names}
        recommended_courses = [
            course["id"]
            for course in all_courses
            if course["course_name"].strip().lower() in name_lookup
        ]

        return jsonify(recommended_courses), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            
def get_user_enrolled(user_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400
    connection = get_connection(database=company_code)
    cursor = connection.cursor()
    try:
        if not user_id:
            user_id = request.args.get("user_id", type=int)

        if not user_id:
            return jsonify({"error": "User ID is required"}), 400

        cursor.callproc("lms_get_enrolled_courses", (user_id,))
        enrolled_courses = cursor.fetchall() or []
        for course in enrolled_courses:
            course_id = course["id"]

            cursor.execute("SELECT thumbnail FROM lms_course WHERE id = %s", (course_id,))
            thumbnail_row = cursor.fetchone()
            if thumbnail_row and thumbnail_row['thumbnail']:
                course["thumbnail"] = thumbnail_row["thumbnail"].decode("utf-8")
            else:
                course["thumbnail"] = None  
                
            cursor.execute("""
                SELECT COUNT(*) AS total_sections
                FROM lms_sections ls
                INNER JOIN lms_modules lm ON ls.module_id = lm.id
                WHERE lm.course_id = %s
            """, (course_id,))
            total_sections = cursor.fetchone()["total_sections"] or 0

            cursor.execute("""
                SELECT COUNT(DISTINCT pd.section_id) AS completed_sections
                FROM lms_points_details pd
                INNER JOIN lms_sections ls ON pd.section_id = ls.id
                INNER JOIN lms_modules lm ON ls.module_id = lm.id
                WHERE lm.course_id = %s AND pd.user_id = %s AND pd.is_passed = 1
            """, (course_id, user_id))
            completed_sections = cursor.fetchone()["completed_sections"] or 0

            course["total_sections"] = total_sections
            course["completed_sections"] = completed_sections

        enrolled_courses = process_courses(enrolled_courses)
        return jsonify(
            {
                "courses": enrolled_courses
            }
        ), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def get_user_assigned(user_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    
    try:
        if not user_id:
            user_id = request.args.get("user_id", type=int)

        if not user_id:
            return jsonify({"error": "User ID is required"}), 400

        cursor.callproc("lms_get_assigned_courses", (user_id,))
        assigned_courses = process_courses(cursor.fetchall() or [])

        for course in assigned_courses:
            course_id = course["id"]

            cursor.execute("SELECT thumbnail FROM lms_course WHERE id = %s", (course_id,))
            image_data = cursor.fetchone()['thumbnail']

            course["thumbnail"] = image_data.decode("utf-8") if image_data else "default-thumbnail.jpg"

        return jsonify(
            {
                "courses": assigned_courses
            }
        ), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def get_user_reccomended(user_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        if not user_id:
            user_id = request.args.get("user_id", type=int)

        if not user_id:
            return jsonify({"error": "User ID is required"}), 400

        cursor.callproc("lms_get_enrolled_courses", (user_id,))
        enrolled_courses = cursor.fetchall() or []

        cursor.callproc("lms_get_all_courses")
        all_courses = process_courses(cursor.fetchall() or [])

        enrolled_courses = process_courses(enrolled_courses)

        cursor.callproc("lms_get_assigned_courses", (user_id,))
        assigned_courses = process_courses(cursor.fetchall() or [])

        base_courses = enrolled_courses if enrolled_courses else assigned_courses
        base_course_names = [course['course_name'] for course in base_courses]
        available_course_names = [course['course_name'] for course in all_courses]

        ai_prompt = (
            "You are an AI-powered course recommendation system. "
            "The user is currently enrolled in the following courses: " + json.dumps(base_course_names) +
            ". Based on category or subject matter, recommend similar courses from this list: " +
            json.dumps(available_course_names) +
            ". ONLY return a JSON array of recommended course names, like this: "
            '["Data Science", "Machine Learning", "Cloud Computing"]. '
            "Do NOT include any explanation or extra text."
        )

        try:
            response = llm.invoke(ai_prompt)
        except Exception as e:
            print("LLM invocation failed:", str(e))
            return jsonify({"error": f"LLM invocation error: {str(e)}"}), 500

        raw_content = None
        if response is None:
            print("LLM returned None")
            return jsonify({"error": "No response from LLM"}), 500

        if hasattr(response, "content"):
            raw_content = response.content
        elif isinstance(response, dict) and "content" in response:
            raw_content = response["content"]
        else:
            # Fallback: stringify whatever the SDK returned
            raw_content = str(response)

        raw_content = (raw_content or "").strip()
        print("LLM raw content:", repr(raw_content)[:1000])

        if not raw_content:
            return jsonify({"error": "Empty response from LLM"}), 500

        parsed = parse_llm_response(raw_content)
        if isinstance(parsed, dict) and "error" in parsed:
            print("LLM parse error:", parsed.get("error"))
            return jsonify(parsed), 500

        # At this point `parsed` should be a list of recommended course names
        recommended_course_names = parsed


        if isinstance(recommended_course_names, dict) and "error" in recommended_course_names:
            return jsonify(recommended_course_names), 500

        if not isinstance(recommended_course_names, list):
            recommended_course_names = []

        name_to_id = {course["course_name"]: course["id"] for course in all_courses}
        course_ids = [name_to_id[name] for name in recommended_course_names if name in name_to_id]

        return jsonify(course_ids), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


def get_user_trending(user_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        if not user_id:
            user_id = request.args.get("user_id", type=int)

        if not user_id:
            return jsonify({"error": "User ID is required"}), 400

        cursor.callproc("lms_get_trending_courses")
        trending_courses = cursor.fetchall() or []

        course_ids = [course["id"] for course in trending_courses]

        return jsonify(course_ids), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

            
def get_user_popular(user_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        if not user_id:
            user_id = request.args.get("user_id", type=int)
        if not user_id:
            return jsonify({"error": "User ID is required"}), 400

        cursor.callproc("lms_get_popular_courses")
        popular_courses = process_courses(cursor.fetchall() or [])

        course_ids = [course["id"] for course in popular_courses]

        return jsonify(course_ids), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def location_master(company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
       cursor.callproc("lms_get_locationmaster")
       result = cursor.fetchall()

       if not result:
           return({"error" : " No data found for this procedure"})
       return (result)

    except Exception as e:
           return ({"error" : str(e)})
    
    finally:
       if cursor:
           cursor.close()
       if connection:
           connection.close()


def process_courses(courses):
    for course in courses:
        if "thumbnail" in course and isinstance(course["thumbnail"], bytes):
            course["thumbnail"] = base64.b64encode(course["thumbnail"]).decode("utf-8")
    return courses


def parse_llm_response(raw_content):
    """Try to extract a JSON array of course names from the LLM response.

    Handles cases where the model prepends explanatory text or returns a JSON object
    containing the array under a key like `recommendedCourses`. Also includes fallbacks
    for truncated arrays by extracting quoted strings.
    """
    try:
        if raw_content is None:
            raise ValueError("Empty response from LLM")

        # Normalize to string
        raw = str(raw_content) if not isinstance(raw_content, str) else raw_content
        raw = raw.strip()

        # Strip surrounding single quotes if present
        if raw.startswith("'") and raw.endswith("'"):
            raw = raw[1:-1].strip()

        # 1) Try direct JSON parse
        try:
            parsed = json.loads(raw)
            if isinstance(parsed, list):
                return parsed
            if isinstance(parsed, dict):
                # check common key
                if "recommendedCourses" in parsed and isinstance(parsed["recommendedCourses"], list):
                    return parsed["recommendedCourses"]
                first_array = next((v for v in parsed.values() if isinstance(v, list)), None)
                if first_array is not None:
                    return first_array
                raise ValueError("Parsed JSON is not a list or does not contain a list value")
        except json.JSONDecodeError:
            pass

        # 2) Try to extract a balanced JSON array (handles cases where explanatory text exists)
        start_idx = raw.find('[')
        if start_idx != -1:
            depth = 0
            end_idx = None
            for i in range(start_idx, len(raw)):
                if raw[i] == '[':
                    depth += 1
                elif raw[i] == ']':
                    depth -= 1
                    if depth == 0:
                        end_idx = i + 1
                        break
            # If we found a closing bracket, try parsing candidate
            if end_idx:
                candidate = raw[start_idx:end_idx]
                try:
                    parsed = json.loads(candidate)
                    if isinstance(parsed, list):
                        return parsed
                except json.JSONDecodeError:
                    # attempt to repair single quotes
                    candidate2 = candidate.replace("'", '"')
                    try:
                        parsed = json.loads(candidate2)
                        if isinstance(parsed, list):
                            return parsed
                    except Exception:
                        pass
            else:
                # No closing bracket - maybe truncated. Try to recover by appending a closing bracket
                candidate = raw[start_idx:]
                candidate_fixed = candidate + ']'
                candidate_fixed = candidate_fixed.replace(',]', ']')
                try:
                    parsed = json.loads(candidate_fixed)
                    if isinstance(parsed, list):
                        print("LLM parse fallback: repaired truncated array by appending closing bracket")
                        return parsed
                except Exception:
                    # not reparable as strict JSON
                    pass

        # 3) Try to extract JSON object and search for list inside
        obj_match = re.search(r'\{.*\}', raw, re.DOTALL)
        if obj_match:
            candidate = obj_match.group(0)
            try:
                parsed = json.loads(candidate)
                if isinstance(parsed, list):
                    return parsed
                if isinstance(parsed, dict):
                    first_array = next((v for v in parsed.values() if isinstance(v, list)), None)
                    if first_array is not None:
                        return first_array
            except json.JSONDecodeError:
                candidate2 = candidate.replace("'", '"')
                try:
                    parsed = json.loads(candidate2)
                    if isinstance(parsed, list):
                        return parsed
                    if isinstance(parsed, dict):
                        first_array = next((v for v in parsed.values() if isinstance(v, list)), None)
                        if first_array is not None:
                            return first_array
                except Exception:
                    pass

        # 4) Final fallback: extract all quoted strings (double or single) and return unique cleaned list
        quoted = re.findall(r'"([^"\\]*(?:\\.[^"\\]*)*)"', raw)
        if not quoted:
            # try single quoted strings
            quoted = re.findall(r"'([^'\\]*(?:\\.[^'\\]*)*)'", raw)

        cleaned = []
        seen = set()
        for q in quoted:
            val = q.strip()
            if val and val not in seen:
                cleaned.append(val)
                seen.add(val)
        if cleaned:
            print(f"LLM parse fallback: extracted {len(cleaned)} quoted items from raw response")
            return cleaned

        raise ValueError("No JSON array found in LLM response")

    except Exception as e:
        return {"error": f"Failed to parse LLM response: {str(e)}"}


def filter_related_courses(enrolled_courses, all_courses):
    """Filter courses that match the categories of enrolled courses."""
    enrolled_categories = {course['category'] for course in enrolled_courses}

    related_courses = [
        course for course in all_courses if course['category'] in enrolled_categories
    ]
    return related_courses


def convert_to_dict(rows):
    """Convert tuple rows from the DB into a dictionary with column names."""
    connection = get_connection()
    cursor = connection.cursor()
    columns = [desc[0] for desc in cursor.description]  
    result = [dict(zip(columns, row)) for row in rows]

    if cursor:
        cursor.close()
    if connection:
        connection.close()

    return result


def create_recommendation_prompt(enrolled_courses, related_courses):
    enrolled_courses_names = [course['course_name'] for course in enrolled_courses]
    related_courses_names = [course['course_name'] for course in related_courses]

    ai_prompt = f"""
    The user is currently enrolled in the following courses: {', '.join(enrolled_courses_names)}.
    Please classify and recommend similar courses from the following list:
    Available courses: {', '.join(related_courses_names)}.

    Your goal: Provide a list of courses that match the user's progress and learning needs.
    """
    return ai_prompt

def filter_courses_by_enrollment(enrolled_courses, recommended_courses):
    enrolled_course_names = [course['course_name'] for course in enrolled_courses]
    filtered_courses = [course for course in recommended_courses if course['course_name'] not in enrolled_course_names]
    return filtered_courses

def get_departments(company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:

        cursor.callproc("lms_get_departments")

        departments = cursor.fetchall()

        if not departments:
            return jsonify({"error": "No departments found."}), 404

        return jsonify({"departments": departments}), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            
def get_time_filter(company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor()
    try:

        cursor.callproc("lms_get_timefilter")

        filters = cursor.fetchall()

        if not filters:
            return jsonify({"error": "No time filters  found."}), 404

        return jsonify({"filters": filters}), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


def set_scoreconfigur():
    data = request.get_json()
    company_code = data.get("company_code")
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor()
    try:
        id = data.get("id")
        attribute_value = data.get("attribute_value")
        created_by  =  data.get("created_by")

        if not attribute_value or not created_by:
            return jsonify({"error": "All fields are required"}), 400

        cursor.callproc("lms_set_scoreconfig", (id, attribute_value, created_by))
        response = cursor.fetchall()

        connection.commit()

        if not response:
            return jsonify({"error": "No response from database"}), 500

        if response[0].get("status") == "error":
            return jsonify({"error": response[0]["message"]}), 400  

        return jsonify({"message": response[0]["message"]}), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


def get_difficulty_levels(company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor()
    try:
        
        cursor.callproc("lms_get_difficulty_levels")

        levels = cursor.fetchall()

        if not levels:
            return jsonify({"response": "No levels found."})

        return jsonify({"levels": levels}), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def get_instructors(company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.callproc("lms_get_instructors")

        instructors = cursor.fetchall()

        if not instructors:
            return jsonify({"name": "No instructors found."})

        return jsonify({"instructors" : instructors}), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
                        
def get_coursestatus(company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        
        cursor.callproc("lms_get_coursestatus")

        status = cursor.fetchall()

        if not status:
            return jsonify({"error": "No status found."}), 404

        return jsonify({"status" : status}), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            
def sections_progress(user_id, filter_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.callproc("lms_completion_progress", (user_id,filter_id))
        progress  =  cursor.fetchall()
        
        if not progress :
            return jsonify({"error" : "no sections are completed for this user id"})
        return jsonify({"completed sections" : progress})
    
    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
        
def users_progress(user_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.callproc("lms_user_progress", (user_id,))
        progress  =  cursor.fetchall()
        
        if not progress :
            return jsonify({"error" : "no data found for this user id"})
        return jsonify({"user_progress" : progress})
    
    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            

def get_userbadges(user_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.callproc("lms_get_userbadges", (user_id,))
        all_results = []
        while True:
            result = cursor.fetchall()
            if result:
                all_results.extend(result)
            if cursor.nextset() is None:
                break

        for badge in all_results:
            badge["total"] = int(badge.get("total", 0))
            badge["status"] = int(badge.get("status", 0))

            s3_key = badge.get("badge_image")
            if s3_key:
                try:
                    badge["badge_image"] = generate_presigned_url(AWS_BUCKET_NAME, s3_key)
                except Exception as err:
                    badge["badge_image"] = None

        return jsonify({
            "badges": all_results
        })

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


def get_course_resources(section_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:

        cursor.callproc("lms_get_courseresource", (section_id,))
        resources = cursor.fetchall()

        return jsonify({
            "resources": resources
        })

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def get_employee_avatar(user_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.execute("""
            SELECT firstname, middlename, lastname 
            FROM employee 
            WHERE id = %s;
        """, (user_id,))
        name_record = cursor.fetchone()

        firstname = name_record["firstname"] if name_record else ""
        middlename = name_record["middlename"] if name_record else ""
        lastname = name_record["lastname"] if name_record else ""
        user_name = " ".join(filter(None, [firstname, middlename, lastname]))
        print(f"this are the uploaded details : {firstname, middlename, lastname }")

        cursor.execute("""
            SELECT am.avatar
            FROM lms_employee_avatars ea
            JOIN lms_avatar_master am ON ea.avatarid = am.id
            WHERE ea.empid = %s;
        """, (user_id,))
        avatar_record = cursor.fetchone()

        if not avatar_record or not avatar_record["avatar"]:
            cursor.execute("SELECT avatar FROM lms_avatar_master WHERE ID = 25;")
            avatar_record = cursor.fetchone()

        if not avatar_record:
            return jsonify({"error": "No avatars available in system"}), 404

        original_avatar = avatar_record["avatar"]

        if original_avatar.startswith("http"):
            path = urlparse(original_avatar).path  
            s3_key = path.lstrip("/")
        else:
            s3_key = original_avatar

        avatar_url = generate_presigned_url(AWS_BUCKET_NAME, s3_key)

        themes = [
            "curiosity", "resilience", "growth mindset", "knowledge", "self-discovery",
            "aspiration", "persistence", "learning journey", "vision", "dreams", "transformation"
        ]

        random_theme = random.choice(themes)

        ai_prompt = (
            f"Write a creative, unique motivational quote about {random_theme}. "
            f"Limit the length to 60 to 70 characters. "
            f"Use powerful and meaningful words. Avoid clichés, rhyming, or repeated templates. "
            f"Do not begin with 'As petals unfurl'. Do not include quotes from known authors. "
            f"Only return the quote itself, with no introduction or formatting."
        )

        response = llm.invoke(ai_prompt)
        ai_message = response.content if hasattr(response, 'content') else str(response)

        return jsonify({
            "user_id": user_id,
            "user_name": user_name,
            "avatar": avatar_url,
            "message": ai_message
        })

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

            
def set_avatars():
    data = request.get_json()
    company_code = data.get("company_code")
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        emp_id = data.get("emp_id")
        avatar_id = data.get("avatar_id")
        print(f"this is the avatars details : {emp_id, avatar_id}")

        cursor.callproc("lms_set_avatars", (emp_id, avatar_id))
        connection.commit()
        avatars  =  cursor.fetchall()
        
        if not avatars :
            return jsonify({"error" : "no data found for this user id"})
        return jsonify(avatars)
    
    except Exception as e:
        if connection:
            connection.rollback()
        
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            
def get_scoreconfig(company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.callproc("lms_get_scoreconfig")
        config  =  cursor.fetchall()
        
        if not config :
            return jsonify({"error" : "no data found"})
        return jsonify(config)
    
    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            
def get_certificate(user_id, course_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.callproc("lms_get_certificate", (user_id, course_id))
        certificate  =  cursor.fetchall()
        
        if not certificate :
            return jsonify({"error" : "no data found"})
        return jsonify(certificate)
    
    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            
def get_avatars(company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.callproc("lms_get_avatars")
        avatars = cursor.fetchall()

        if not avatars:
            return jsonify({"error": "No data found"}), 404

        for avatar in avatars:
            s3_key = avatar.get("avatar")
            if s3_key:
                avatar["avatar"] = generate_presigned_url(AWS_BUCKET_NAME, s3_key)

        return jsonify(avatars)

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

            
def get_employee_dashboard(user_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    try:
        cursor.execute("CALL lms_employee_dashboard(%s)", (user_id,))
        results = []

        while True:
            data = cursor.fetchall()
            if data:
                results.append(data)
                print(f"this is the getting results : {results}")
            if not cursor.nextset():
                break

        completed_sections = results[0][0].get("completed_sections", 0) if len(results) > 0 and results[0] else 0
        completed_modules = results[1][0].get("completed_modules", 0) if len(results) > 1 and results[1] else 0
        completed_courses = results[2][0].get("completed_courses", 0) if len(results) > 2 and results[2] else 0
        total_acquired_points = results[3][0].get("total_acquired_points", 0) if len(results) > 3 and results[3] else 0
        average_test_score = results[3][0].get("average_test_score", 0) if len(results) > 3 and results[3] else 0
        certificates_earned = results[4][0].get("certificates_earned", 0) if len(results) > 4 and results[4] else 0
        current_streak = results[5][0].get("current_streak", 0) if len(results) > 5 and results[5] else 0

        response = {
            "completed_sections": completed_sections,
            "completed_modules": completed_modules,
            "completed_courses": completed_courses,
            "total_acquired_points": total_acquired_points,
            "average_test_score": average_test_score,
            "certificates_earned": certificates_earned,
            "current_streak": current_streak
        }
        print(f"this is the response from the employee dashboard : {response}")

        return jsonify({"employee_dashboard": response}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        connection.close()
        
def get_employee_leaderboard(department_id, manager_id, branch_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    branch_id_str = "".join(str(x) for x in branch_id) if isinstance(branch_id, list) else str(branch_id)
    manager_id_str = "".join(str(x) for x in manager_id) if isinstance(manager_id, list) else str(manager_id)
    department_id_str = "".join(str(x) for x in department_id) if isinstance(department_id, list) else str(department_id)

    try:
        cursor.execute("CALL lms_get_employee_leaderboard(%s, %s, %s)", (department_id_str, manager_id_str, branch_id_str))
        results = cursor.fetchall()
        leaderboard = []
        for row in results:
            avatar_presigned = None
            avatar_value = row.get('avatar')
            print(f"this is the avatar value : {avatar_value}")
            if not avatar_value:
                cursor.execute("SELECT avatar FROM lms_avatar_master WHERE id = 25;")
                default_avatar = cursor.fetchone()
                avatar_value = default_avatar["avatar"] if default_avatar else None
                print(f"this is the default avatar value : {avatar_value}")

            if avatar_value:
                try:
                    avatar_presigned = generate_presigned_url(AWS_BUCKET_NAME, avatar_value)
                except Exception:
                    avatar_presigned = None

            badges = []
            if row.get('badges'):
                try:
                    badges_data = row['badges']
                    badges_json = json.loads(badges_data)

                    for badge in badges_json:
                        badge_image_path = badge.get("badge_image")  
                        presigned_url = generate_presigned_url(AWS_BUCKET_NAME, badge_image_path)
                        badges.append({
                            "badge_id": badge.get("badge_id"),
                            "badge_name": badge.get("badge_name"),
                            "badge_image": presigned_url
                        })
                except Exception:
                    badges = []

            leaderboard.append({
                "rank": row.get("rank_position", -1),
                "average_test_score": row.get("average_test_score"),
                "user_id": row.get("user_id"),
                "username": row.get("username"),
                "total_acquired_points": int(row.get("total_acquired_points", 0) or 0),
                "badges": badges,
                "avatar": avatar_presigned,
                "highest_streak": row.get("highest_streak", 0)
            })

        return jsonify({"employees_leaderboard": leaderboard}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        connection.close()


def get_manager_dashboard(manager_id):
    
    connection = get_connection()
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    manager_id_str = ",".join(str(x) for x in manager_id) if isinstance(manager_id, list) else str(manager_id)
    try:

        cursor.callproc("lms_manager_dashboard", (manager_id_str,))
        results = []
        
        while True:
            data = cursor.fetchall()
            if data:
                results.append(data)
            if not cursor.nextset():
                break

        if len(results) < 6:
            return jsonify({"error": "Incomplete data from stored procedure"}), 500

        leaderboard_position = [
            {
                "rank": row.get("rank_position", None),
                "user_id": row.get("user_id", None),
                "total_acquired_points": row.get("total_acquired_points", 0)
            }
            for row in results[5] if "rank_position" in row
        ] if len(results) > 5 and results[5] else []

        response = {
            "total_employees_enrolled": results[0][0].get("total_employees_enrolled", 0) if results[0] else 0,
            "certificates_earned": results[1][0].get("certificates_earned", 0) if results[1] else 0,
            "course_completion": results[2] if len(results) > 2 else [],
            "quiz_performance": results[3] if len(results) > 3 else [],
            "active_or_inactive": results[4] if len(results) > 4 else [],
            "leaderboard_position": leaderboard_position
        }

        return jsonify({"manager_dashboard": response}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        connection.close()

def get_section_questions(section_id, company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400
    
    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor) 
    try:
        cursor.callproc("lms_get_questions", (section_id,))
        questions = cursor.fetchall()

        for question in questions:
            if "content_length" in question and isinstance(question["content_length"], (str, bytes)) is False:
                total_seconds = question["content_length"].total_seconds()
                hours, remainder = divmod(total_seconds, 3600)
                minutes, seconds = divmod(remainder, 60)
                question["content_length"] = f"{int(hours):02}:{int(minutes):02}:{int(seconds):02}"

            s3_key = question.get("image")
            if s3_key:
                try:
                    keys = [key.strip() for key in s3_key.split(",")]
                    question["image"] = [
                        generate_presigned_url(AWS_BUCKET_NAME, key) for key in keys if key
                    ]
                except Exception as err:
                    question["images"] = []

        return jsonify({"questions": questions}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

        
def enroll_user():
    connection = None
    cursor = None
    emp_name = None
    emp_role = None

    try:
        data = request.get_json()
        user_id = data.get("user_id")
        course_id = data.get("course_id")
        company_code = data.get("company_code")

        if not company_code:
            return jsonify({"error": "company_code is required"}), 400
        if not user_id or not course_id:
            return jsonify({"error": "User ID and Course ID are required"}), 400

        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        cursor.callproc("lms_set_enrollment", (user_id, course_id))
        enrollment = cursor.fetchone()
        connection.commit()

        start_date = datetime.now().strftime("%Y-%m-%d")

        cursor.execute("SELECT course_name FROM lms_course WHERE id = %s", (course_id,))
        course_row = cursor.fetchone()
        course_name = course_row["course_name"] if course_row else "Unknown Course"
        print(f"this is the course name : {course_name}")

        cursor.execute("""
            SELECT e.id, e.empid, e.firstname, e.middlename, e.lastname, e.officeemail,
                   r.name AS role_name
            FROM employee e
            LEFT JOIN employee_roles er ON e.id = er.employee_id 
                AND (er.effective_to_date IS NULL OR er.effective_to_date >= CURDATE())
            LEFT JOIN rolesmaster r ON er.role_id = r.id
            WHERE e.id = %s
            ORDER BY er.effective_from_date DESC
            LIMIT 1
        """, (user_id,))
        employee = cursor.fetchone()
        print(f"this are the emplyee details : {employee}")

        cursor.execute("""
            SELECT m.id, m.empid, m.firstname, m.middlename, m.lastname, m.officeemail,
                   r.name AS role_name
            FROM employee_reportingmanagers erm
            JOIN employee m ON erm.reportingmanagerid = m.id
            LEFT JOIN employee_roles er ON m.id = er.employee_id
                AND (er.effective_to_date IS NULL OR er.effective_to_date >= CURDATE())
            LEFT JOIN rolesmaster r ON er.role_id = r.id
            WHERE erm.empid = %s and r.name = 'Manager'
              AND (erm.effectiveenddate IS NULL OR erm.effectiveenddate >= CURDATE())
        """, (user_id,))
        managers = cursor.fetchall()
        print(f"this are the manager details : {managers}")

        email_results = []
        print(f"this are the email results : {email_results}")

        if employee and employee["officeemail"]:
            emp_name = " ".join(filter(None, [employee["firstname"], employee["middlename"], employee["lastname"]]))
            emp_role = employee.get("role_name") or "Employee"

            subject = "You’re Enrolled – Your Learning Journey Begins! 🎓"
            body = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <p>Hi {emp_name},</p>
                <p>Good news! You’ve been successfully enrolled in a new course through our Learning Management System (LMS).</p>
                <p><b>Course Title:</b> {course_name}<br>
                <b>Start Date:</b> {start_date}<br>
                <p>This course is part of your professional development plan and will help you strengthen your skills.</p>
                <p>👉 <a href="https://sreeb.spryple.com/" target="_blank">Access your course here</a></p>
                <p>We recommend setting aside time each week to complete the modules and quizzes. Once finished, you’ll receive a certificate of completion (if applicable) and recognition for your learning achievement.
If you have any questions or face difficulties accessing the course, please reach out to [Support Contact / HR team].
</p><br>
                <p>Wishing you a great learning experience!</p>
                <p>Best Regards,<br>
                {emp_name}<br>
                {emp_role}<br>
                {company_code}</p>
            </body>
            </html>
            """
            success = send_email(employee["officeemail"], subject, body)
            email_results.append({
                "to": employee["officeemail"],
                "role": "employee",
                "status": "sent" if success else "failed"
            })
        else:
            email_results.append({
                "to": None,
                "role": "employee",
                "status": "skipped - no email"
            })

        for mgr in managers:
            mgr_name = " ".join(filter(None, [mgr["firstname"], mgr["middlename"], mgr["lastname"]]))
            mgr_role = mgr.get("role_name") or "Manager"
            mgr_email = mgr.get("officeemail")
            safe_emp_name = emp_name or "the employee"


            if not mgr_email:
                email_results.append({
                    "to": None,
                    "role": "manager",
                    "status": f"skipped - no email ({mgr_name})"
                })
                continue

            subject = f"New Course Enrollment – {safe_emp_name}"
            body = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <p>Hi {mgr_name},</p>
                <p>We’re excited to share that your team member, <b>{emp_name}</b>, has been successfully enrolled in a new course on our LMS.</p>
                <p><b>Course Title:</b> {course_name}<br>
                <b>Start Date:</b> {start_date}<br>
                <p>This program is designed to strengthen {emp_name}’s skills and support their professional growth.</p> 
                <p>As a manager, your encouragement and guidance will make a big difference in helping them complete the course and apply their learning effectively at work.</p>
                <p>👉 <a href="https://sreeb.spryple.com/" target="_blank">Manager Access</a></p>
                <p>For any questions or support, please feel free to reach out to [Support Contact / HR Team].</p>
                <p>Thank you for fostering a culture of continuous learning within your team!</p>
                <p>Best Regards,<br>
                {mgr_name}<br>
                {mgr_role}<br>
                {company_code}</p>
            </body>
            </html>
            """ 
            success = send_email(mgr_email, subject, body)
            email_results.append({
                "to": mgr_email,
                "role": "manager",
                "status": "sent" if success else "failed"
            })

        return jsonify({
            "message": "Enrollment successful",
            "course_id": course_id,
            "employee": employee,
            "managers": managers,
            "email_results": email_results
        }), 201

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def send_mail_reminders(company_code=None):
    connection = None
    cursor = None
    try:
        if not company_code:
            # Try to get from request if available (API call)
            try:
                data = request.get_json()
                company_code = data.get("company_code")
            except:
                # No request context (cron call), company_code should be passed as parameter
                pass
        

        if not company_code:
            return {"error": "company_code is required"}, 400

        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        cursor.callproc("lms_get_mail_reminders")
        reminders = cursor.fetchall()

        if not reminders:
            return {"message": "No pending reminders found"}, 200

        email_results = []
        print(f"this are the email results : {email_results}")

        for row in reminders:
            user_id = row.get("user_id")
            employee_name = row.get("employee_name")
            to_email = row.get("officeemail")
            course_name = row.get("course_name")
            due_date = row.get("due_date")
            status = row.get("status")
            role_name = row.get("role_name", "Employee")

            if not to_email:
                print(f"⚠ Skipping {employee_name}, no email found.")
                email_results.append({
                    "user_id": user_id,
                    "email": None,
                    "course": course_name,
                    "status": "skipped - no email"
                })
                continue

            subject = "Reminder – Complete Your Course Before the Deadline"
            body = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <p>Hi {employee_name},</p>
                <p>Just a friendly reminder that you have a course in our Learning Management System (LMS) that is due for completion.</p>
                <ul>
                    <li><b>Course Title:</b> {course_name}</li>
                    <li><b>Completion Deadline:</b> {due_date.strftime("%Y-%m-%d") if due_date else "N/A"}</li>
                    <li><b>Status:</b> {status}</li>
                </ul>
                <p>We encourage you to complete the course on time to stay on track with your learning goals and development plan. 
                Timely completion will also help you apply the new skills in your role effectively.</p>
                <p>👉 Access your course here: 
                    <a href="https://sreeb.spryple.com/" target="_blank">LMS Login</a>
                </p>
                <p>If you face any challenges or need assistance, please reach out to your HR team.</p>
                <p>Keep up the great work, and happy learning!</p>
                <br>
                <p>Best Regards,<br>
                {employee_name}<br>
                {role_name}<br>
                {company_code}</p>
            </body>
            </html>
            """

            sent = send_email(to_email, subject, body)

            email_results.append({
                "user_id": user_id,
                "email": to_email,
                "course": course_name,
                "status": "sent" if sent else "failed"
            })

        result = {
            "message": f"{len(email_results)} reminder emails processed",
            "results": email_results
        }
        
        # Return jsonify for API calls, dict for cron calls
        try:
            from flask import request
            return jsonify(result), 200
        except:
            return result, 200

    except Exception as e:
        error = {"error": str(e)}
        try:
            from flask import request
            return jsonify(error), 500
        except:
            return error, 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def due_mail_manager(company_code=None):
    connection = None
    cursor = None
    try:
        if not company_code:
            # Try to get from request if available (API call)
            try:
                data = request.get_json()
                company_code = data.get("company_code")
            except:
                # No request context (cron call), company_code should be passed as parameter
                pass
        

        if not company_code:
            return {"error": "company_code is required"}, 400

        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        cursor.callproc("lms_get_due_mail_managers")

        rows = cursor.fetchall()
        print(f"this is the result from database : {rows}")
        if not rows:
            return {"message": "No due or overdue courses found"}, 200

        sent_count = 0
        sent_emails = set()  # Track sent emails to avoid duplicates
        for row in rows:
            manager_email = row.get("manager_email")
            if not manager_email:
                continue
            
            email_key = f"{manager_email}_{row['employee_name']}_{row['course_name']}"
            if email_key in sent_emails:
                continue
            
            sent_emails.add(email_key)

            subject = f"Course Completion Due – {row['employee_name']}"
            body = f"""
            <p>Hi {row['manager_name']},</p>
            <p>This is a gentle reminder that your team member, <b>{row['employee_name']}</b>, has a pending course completion deadline on the Learning Management System (LMS).</p>
            <p><b>Course Title:</b> {row['course_name']}<br>
            <b>Completion Deadline:</b> {row['due_date']}<br>
            <b>Status:</b> {row.get('enrollment_status', 'Not Started')}</p>
            <p>We request your support in encouraging {row['employee_name']} to complete the course on time. 
            Timely completion will ensure they gain the intended skills and contribute effectively to their development plan.</p>
            <p>👉 <a href='https://sreeb.spryple.com/'>Manager Access (to view progress)</a></p>
            <p>For any clarifications or technical support, please reach out to your HR team.</p>
            <p>Thank you for actively driving learning and development within your team.</p>
            <p>Best Regards,<br>
            <b>{row['manager_name']}</b><br>
            {company_code}</p>
            """
            send_email(manager_email, subject, body)
            sent_count += 1

        result = {"message": f"Successfully sent {sent_count} due reminder emails to managers"}
        
        try:
            from flask import request
            return jsonify(result), 200
        except:
            return result, 200

    except Exception as e:
        print("Error:", e)
        error = {"error": str(e)}
        try:
            from flask import request
            return jsonify(error), 500
        except:
            return error, 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def escalation_mail(company_code=None):
    connection = None
    cursor = None

    try:
        if not company_code:
            try:
                from flask import request
                company_code = request.get_json().get("company_code")
            except:
                pass

        if not company_code:
            return {"error": "company_code is required"}, 400

        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        cursor.callproc("lms_get_escalation_users")
        rows = cursor.fetchall()
        print(f"[escalation_mail] rows fetched: {len(rows)}")
        if rows:
            print(f"[escalation_mail] sample row keys: {list(rows[0].keys())}")  # shows actual columns

        if not rows:
            return {"message": "No overdue mandatory courses found"}, 200

        sent_keys = set()
        sent_count = 0

        for row in rows:
            key = (
                row["recipient_role"],
                row["recipient_email"],
                row["employee_id"],
                row["course_name"]
            )

            # 🚫 Prevent duplicate mails
            if key in sent_keys:
                continue

            sent_keys.add(key)

            subject = "Escalation: Incomplete Mandatory Course"

            body = f"""
            <p>Dear {row['recipient_name']},</p>

            <p>
            This is an <b>escalation notice</b> regarding the mandatory course
            assigned to the employee listed below on the Learning Management System (LMS).
            </p>
            <p>Despite multiple reminders, our records indicate that the course has not yet been completed.</p>
            <p>Completing this course is essential for skill development. If they are facing any issues accessing
             or completing the course, please inform us immediately so we can assist them.</p>

            <p>
            <b>Employee Name:</b> {row['employee_name']}<br>
            <b>Course Title:</b> {row['course_name']}<br>
            <b>Completion Deadline:</b> {row['due_date']}<br>
            <b>Status:</b> {row['enrollment_status']}
            </p>

            <p>
            The completion deadline has passed.
            Please ensure the course is completed at the earliest.
            </p>

            <p>
            👉 <a href="https://sreeb.spryple.com/">LMS Access</a>
            </p>

            <p>
            Best Regards,<br>
            <b>{row['recipient_name']}</b><br>
            {company_code}
            </p>
            """

            send_email(row["recipient_email"], subject, body)
            sent_count += 1

        return {
            "message": "Escalation emails sent successfully",
            "emails_sent": sent_count
        }, 200

    except Exception as e:
        return {"error": str(e)}, 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


def store_avatar_badge_images():
    try:
        data = request.get_json()
        file_path = data.get("file_path")

        if not file_path or not os.path.exists(file_path):
            return jsonify({"error": "Invalid or missing file path"}), 400

        filename = secure_filename(os.path.basename(file_path))
        s3_key = f"avatars/{filename}"

        with open(file_path, "rb") as file_obj:
            s3_url = upload_fileobj_to_s3(file_obj, AWS_BUCKET_NAME, s3_key)

        if not s3_url:
            return jsonify({"error": "S3 upload failed"}), 500

        return jsonify({
            "message": "Avatar uploaded and URL stored successfully",
            "avatar_url": s3_url
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

def search_employees():
    """
    Search employees by name (firstname, middlename, lastname)
    Supports case-insensitive partial matching
    """
    try:
        company_code = request.args.get('company_code')
        search_query = request.args.get('search_query', '').strip()
        
        if not company_code:
            return jsonify({"error": "company_code is required"}), 400
        
        if not search_query or len(search_query) < 1:
            return jsonify({"error": "search_query must be at least 1 character"}), 400
        
        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        
        try:
            # Build base query
            query = """
                SELECT 
                    e.id,
                    e.firstname,
                    e.middlename,
                    e.lastname,
                    CONCAT_WS(' ', e.firstname, e.middlename, e.lastname) AS full_name
                FROM employee e
                WHERE 1=1
            """
            
            params = []
            
            # Filter by search query (case-insensitive)
            search_pattern = f"{search_query}%"
            query += """
                AND (
                    e.firstname LIKE %s
                    OR e.middlename LIKE %s
                    OR e.lastname LIKE %s
                    OR CONCAT_WS(' ', e.firstname, e.middlename, e.lastname) LIKE %s
                )
            """
            params.extend([search_pattern, search_pattern, search_pattern, search_pattern])
        
            
            # Limit results to prevent huge responses
            query += " LIMIT 50"
            
            cursor.execute(query, tuple(params))
            results = cursor.fetchall()
            
            return jsonify({
                "success": True,
                "count": len(results),
                "employees": results
            }), 200
            
        finally:
            cursor.close()
            connection.close()
    
    except Exception as e:
        print(f"Error in search_employees: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
def get_my_completed_courses(user_id, company_code):
    """
    Fetch completed courses for the logged-in employee
    """
    try:  # from token/session ideally

        if not company_code:
            return jsonify({"error": "company_code is required"}), 400

        if not user_id:
            return jsonify({"error": "employee_id is required"}), 400

        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        try:
            # Call stored procedure
            cursor.callproc(
                'lms_get_completed_courses',
                [user_id]
            )

            results = cursor.fetchall()
            cursor.nextset()

            return jsonify({
                "success": True,
                "completed_courses": results
            }), 200

        finally:
            cursor.close()
            connection.close()

    except Exception as e:
        print(f"Error in get_my_completed_courses: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

def fetch_all_employees(company_code):
    try:
        if not company_code:
            return jsonify({"error": "company_code is required"}), 400

        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        try:
            cursor.callproc("lms_get_all_employees")
            employees = cursor.fetchall()

            return jsonify({
                "success": True,
                "employees": employees
            }), 200

        finally:
            cursor.close()
            connection.close()

    except Exception as e:
        print(f"Error in fetch_all_employees: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
def assign_reviewers():
    data=request.get_json()
    company_code = data.get("company_code")
    enrollment_id = data.get("enrollment_id")
    reviewer_ids = data.get("reviewer_ids", [])
    
    if not all([company_code, enrollment_id, isinstance(reviewer_ids, list)]):
        return jsonify({"error": "Missing required fields: company_code, enrollment_id, reviewer_ids"}), 400
    
    connection=get_connection(database=company_code)
    cursor=connection.cursor()
    try:
        for reviewer_id in reviewer_ids:
            cursor.callproc("lms_assign_reviewer", (enrollment_id, reviewer_id))
        
        connection.commit()
        return jsonify({"success": True, "message": "Reviewers assigned successfully"}), 200

    except Exception as e:
        connection.rollback()
        print(f"Error in assign_reviewers: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        connection.close()
        
def get_pending_reviews(reviewer_id, company_code):
    try:
        if not company_code:
            return jsonify({"error": "company_code is required"}), 400
        if not reviewer_id:
            return jsonify({"error": "reviewer_id is required"}), 400
        
        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        try:
            cursor.callproc("lms_get_pending_reviews", (reviewer_id,))
            reviews = cursor.fetchall()

            return jsonify({
                "success": True,
                "pending_reviews": reviews
            }), 200

        finally:
            cursor.close()
            connection.close()

    except Exception as e:
        print(f"Error in get_pending_reviews: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

def get_course_by_questions(course_id, company_code):
    try:
        if not company_code:
            return jsonify({"error": "company_code is required"}), 400
        if not course_id:
            return jsonify({"error": "course_id is required"}), 400
        
        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        try:
            cursor.callproc("lms_get_questions_by_courses", (course_id,))
            questions = cursor.fetchall()

            return jsonify({
                "success": True,
                "questions": questions
            }), 200

        finally:
            cursor.close()
            connection.close()

    except Exception as e:
        print(f"Error in get_course_by_questions: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
def lms_store_user_choice():
    try:
        data = request.get_json()
        company_code = data.get("company_code")
        question_id = data.get("question_id")
        selected_option = data.get("selected_option")

        if not all([company_code, question_id, selected_option]):
            return jsonify({"error": "Missing required fields"}), 400

        connection = get_connection(database=company_code)
        cursor = connection.cursor()

        try:
            cursor.callproc("lms_store_user_choice", ( question_id, selected_option))
            connection.commit()

            return jsonify({"success": True, "message": "User choice stored successfully"}), 200

        finally:
            cursor.close()
            connection.close()

    except Exception as e:
        print(f"Error in lms_store_user_choice: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
def lms_update_review_status():
    try:
        data = request.get_json()
        company_code = data.get("company_code")
        review_id = data.get("review_id")
        new_status = data.get("new_status")
        remarks = data.get("remarks")
        reviewed_by = data.get("reviewed_by")

        if not all([company_code, review_id, new_status]):
            return jsonify({"error": "Missing required fields"}), 400

        connection = get_connection(database=company_code)
        cursor = connection.cursor()

        try:
            cursor.callproc("lms_update_review_status", (review_id, new_status,remarks,reviewed_by))
            connection.commit()

            return jsonify({"success": True, "message": "Review status updated successfully"}), 200

        finally:
            cursor.close()
            connection.close()

    except Exception as e:
        print(f"Error in lms_update_review_status: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

def get_reviewer_history(user_id, company_code):
    try:
        if not company_code:
            return jsonify({"error": "company_code is required"}), 400
        if not user_id:
            return jsonify({"error": "user_id is required"}), 400
        
        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        try:
            cursor.callproc("lms_get_user_review_history", (user_id,))
            history = cursor.fetchall()

            return jsonify({
                "success": True,
                "review_history": history
            }), 200

        finally:
            cursor.close()
            connection.close()

    except Exception as e:
        print(f"Error in get_reviewer_history: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
def store_questions_bulk(cursor, section_id, questions_list):
    """Single executemany — replaces N individual callproc calls."""
    if not questions_list:
        return True
    rows = []
    for q in questions_list:
        opts   = json.dumps({k: q.get(k, "") for k in "ABCD"})
        answer = q.get("Answer") or q.get("answer", "")
        qtext  = q.get("question") or q.get("Question", "")
        if qtext and answer:
            rows.append((int(section_id), qtext, opts, answer))
    if rows:
        cursor.executemany(
            "INSERT INTO lms_questions (section_id, question_text, options,correct_answer) "
            "VALUES (%s, %s, %s, %s)",
            rows
        )
    return True


def format_length(length) -> str:
    """Normalise any length value to HH:MM:SS string."""
    if length is None:
        return "00:00:00"
    if isinstance(length, str) and ":" in length:
        return length
    try:
        secs = float(length)
        h = int(secs // 3600)
        m = int((secs % 3600) // 60)
        s = int(secs % 60)
        return f"{h:02d}:{m:02d}:{s:02d}"
    except Exception:
        return "00:00:00"   
    
def get_lms_reviewers(company_code, emp_id):
   
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400
 
    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.callproc("lms_get_reviewer_approver_id", (emp_id,))
 
        reviewer = cursor.fetchall()
 
        if not reviewer:
            return jsonify({"name": "No reviewer found."})
 
        return jsonify({"reviewer" : reviewer}), 200
 
    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500
 
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
 
 
def get_lms_approvers(company_code, emp_id):
   
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400
 
    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.callproc("lms_get_reviewer_approver_id", (emp_id,))
 
        approver = cursor.fetchall()
 
        if not approver:
            return jsonify({"name": "No approver found."})
 
        return jsonify({"approver" : approver}), 200
 
    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500
 
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
 
def lms_add_version_details():
    data = request.get_json()
    company_code = data.get("company_code")
    course_id = data.get("course_id")

    if not company_code:
        return jsonify({"response": "company_code is required"})
 
    connection = None
    cursor = None
   
    # Prepare JSON fields
    
   
    try:
        reviewer_json = json.dumps(data.get("reviewer_suggestions", {}))
        approver_json = json.dumps(data.get("approver_suggestions", {}))
        connection = get_connection(database=company_code)
        cursor = connection.cursor()
        cursor.callproc(
            "lms_add_version_details",
            (
                course_id,
                data.get("version"),
                data.get("reviewer_empid"),
                data.get("approver_empid"),
                data.get("status_code"),
                reviewer_json,
                approver_json,
            )
        )
       
        connection.commit()
        return jsonify({
            "status": True,
            "message": "Inserted successfully"
        })
 
    except Exception as e:
        if connection:
            connection.rollback()
 
        return jsonify({
            "status": False,
            "error": str(e)
        })
 
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
                                                
def send_course_review_email(employee_email, course_name, reviewer_name,instructor_name, company_code):
    subject = f"Invitation to Review Course – {course_name}"

    reviewer_greeting = f"Dear {reviewer_name}," if reviewer_name else "Dear Reviewer,"

    body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        
        <p>{reviewer_greeting}</p>

        <p>You are hereby invited to review the course titled <b>{course_name}</b>.</p>

        <p>Your expertise and feedback are highly valued and will contribute significantly to maintaining the quality and effectiveness of the course content.</p>

        <p>Kindly access the Learning Management System using the link below to review the course and provide your feedback:</p>

        <p>
            <a href="https://sreeb.spryple.com/" target="_blank" 
            style="color: #1a73e8; text-decoration: none; font-weight: bold;">
            Access LMS
            </a>
        </p>

        <p>If you require any further information or assistance, please do not hesitate to contact [Support Contact / HR team].</p>

        <p>Best regards,<br>
        <b>{instructor_name}</b><br>
        LMS Instructor<br>
        {company_code}</p>
        <b></b></p>

    </body>
    </html>
    """

    return send_email(employee_email, subject, body)


def submit_course():
    data = request.json

    instructor_id = data.get('userId')
    course_id = data.get('courseId')
    reviewer_id = data.get('reviewer_id')
    company_code = data.get('company_code')

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    try:
        query = """
            SELECT 
                c.course_name,

                CONCAT_WS(
                    ' ',
                    e.firstname,
                    NULLIF(e.middlename, ''),
                    e.lastname
                ) AS reviewer_name,
                e.officeemail,

                CONCAT_WS(
                    ' ',
                    i.firstname,
                    NULLIF(i.middlename, ''),
                    i.lastname
                ) AS instructor_name

            FROM 
                lms_course c
            JOIN employee e ON e.id = %s
            JOIN employee i ON i.id = %s
            WHERE 
                c.id = %s
        """

        cursor.execute(query, (reviewer_id, instructor_id, course_id))
        response = cursor.fetchone()

        if not response:
            return jsonify({"message": "No data found"}), 404

        # Extract values
        course_name = response.get("course_name")
        reviewer_name = response.get("reviewer_name")
        reviewer_email = response.get("officeemail")
        instructor_name = response.get("instructor_name")

        # Send Email
        email_status = send_course_review_email(
            employee_email=reviewer_email,
            course_name=course_name,
            reviewer_name=reviewer_name,
            instructor_name=instructor_name,
            company_code=company_code
        )

        if not email_status:
            return jsonify({
                "message": "Course fetched but email sending failed",
                "response": response
            }), 500

        return jsonify({
            "message": "Course submitted and email sent successfully",
            "response": response
        }), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            
def get_lms_checklist_courses_instructor( user_id,company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400
    
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.callproc("lms_get_checklist_courses_instructor", (user_id,))

        courses = cursor.fetchall()

        if not courses:
            return jsonify({"message": "No checklist courses found."}), 200
        
        for course in courses:
            # Same approach as get_courses
            if "thumbnail" in course and isinstance(course["thumbnail"], bytes):
                course["thumbnail"] = course["thumbnail"].decode("utf-8")
            else:
                course["thumbnail"] = None

        return jsonify({"checklist_courses" : courses}), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            
def get_lms_checklist_courses_reviewer( user_id,company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400
    
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.callproc("lms_get_checklist_courses_reviewer", (user_id,))

        courses = cursor.fetchall()

        if not courses:
            return jsonify({"message": "No checklist courses found."}), 200
        
        for course in courses:
            # Same approach as get_courses
            if "thumbnail" in course and isinstance(course["thumbnail"], bytes):
                course["thumbnail"] = course["thumbnail"].decode("utf-8")
            else:
                course["thumbnail"] = None

        return jsonify({"checklist_courses" : courses}), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def get_lms_checklist_courses_approver( user_id,company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400
    
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.callproc("lms_get_checklist_courses_approver", (user_id,))

        courses = cursor.fetchall()

        if not courses:
            return jsonify({"message": "No checklist courses found."}), 200
        
        for course in courses:
            # Same approach as get_courses
            if "thumbnail" in course and isinstance(course["thumbnail"], bytes):
                course["thumbnail"] = course["thumbnail"].decode("utf-8")
            else:
                course["thumbnail"] = None

        return jsonify({"checklist_courses" : courses}), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            
def get_course_details(course_id, company_code):
    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    try:
        cursor.execute("""
            SELECT 
                c.id,
                c.course_name,
                c.description,
                c.instructor_id,
                c.category,
                c.difficulty_level,
                c.prerequisites,
                c.tags,
                c.thumbnail,

                ct.reviewer_empid,
                ct.approver_empid,
                ct.reviewer_suggestions,
                ct.approver_suggestions

            FROM lms_course c
            LEFT JOIN lms_course_tracker ct 
                ON ct.urn = c.id
            WHERE c.id = %s
            ORDER BY ct.id DESC
            LIMIT 1;
        """, (course_id,))

        course = cursor.fetchone()

        if not course:
            return jsonify({"error": "Course not found"}), 404
        
        if course.get("reviewer_suggestions"):
            if isinstance(course["reviewer_suggestions"], str):
                course["reviewer_suggestions"] = json.loads(course["reviewer_suggestions"])

        if course.get("approver_suggestions"):
            if isinstance(course["approver_suggestions"], str):
                course["approver_suggestions"] = json.loads(course["approver_suggestions"])
        
        for key, value in course.items():
            if isinstance(value, bytes):
                if key == "thumbnail":
                    # First decode bytes to string
                    decoded = value.decode("utf-8", errors="ignore")
                    
                    # Check if it's already a base64 string
                    # base64 strings only contain A-Z, a-z, 0-9, +, /, =
                    import re
                    if re.match(r'^[A-Za-z0-9+/=]+$', decoded.strip()):
                        # Already base64 — just use it as-is
                        course[key] = decoded
                    else:
                        # It's raw binary — encode it
                        course[key] = base64.b64encode(value).decode("utf-8")
                else:
                    course[key] = value.decode("utf-8", errors="ignore")
            elif isinstance(value, str) and key == "thumbnail":
                # Already a string in DB — use directly
                course[key] = value

        return jsonify({"course": course}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        connection.close()
        
def get_course_content(course_id, company_code):
    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    try:
        # 1. Modules
        cursor.execute("""
            SELECT id, module_name, description
            FROM lms_modules
            WHERE course_id = %s and is_deleted=0
        """, (course_id,))
        modules = cursor.fetchall()

        final_modules = []

        for module in modules:
            # 2. Sections
            cursor.execute("""
                SELECT *
                FROM lms_sections
                WHERE module_id = %s and is_deleted=0
            """, (module['id'],))
            sections = cursor.fetchall()

            final_sections = []

            for sec in sections:

                content = sec.get("content", "")

                video_url = None
                document_url = None
                text_content = None

                # 🔥 Detect content type + generate S3 URL
                if content:
                    if content.endswith((".mp4", ".webm", ".ogg")):
                        video_url = generate_presigned_url(AWS_BUCKET_NAME, content)

                    elif content.endswith((".pdf", ".doc", ".docx", ".txt")):
                        document_url = generate_presigned_url(AWS_BUCKET_NAME, content)

                    else:
                        text_content = content  # notes stored directly

                # 3. Resources
                cursor.execute("""
                    SELECT *
                    FROM lms_course_resource
                    WHERE section_id = %s and is_deleted=0
                """, (sec['id'],))
                resources = cursor.fetchall()

                formatted_resources = []

                for r in resources:
                    res_content = r.get("resource_content")

                    resource_url = None

                    if res_content:
                        # ✅ FIX 1: REMOVE quotes FIRST
                        if isinstance(res_content, str):
                            res_content = res_content.replace('"', '').strip()

                        # ✅ FIX 2: now check properly
                        if res_content.startswith("http"):
                            resource_url = res_content
                        else:
                            resource_url = generate_presigned_url(AWS_BUCKET_NAME, res_content)

                    formatted_resources.append({
                        "resourceType": "link" if res_content and res_content.startswith("http") else "document",
                        "link": resource_url,
                        "docName": r.get("resource_name"),
                        "docUrl": resource_url
                    })

                final_sections.append({
                    "section_id": sec["id"],
                    "title": sec["section_name"],
                    "description": sec["description"],
                    "videoUrl": video_url,
                    "sanitizedDocumentUrl": document_url,
                    "textContent": text_content,
                    "resources": formatted_resources,
                    "showContentOptions": False
                })

            final_modules.append({
                "module_id": module["id"],
                "title": module["module_name"],
                "description": module["description"],
                "sections": final_sections
            })

        return {
            "status": "success",
            "modules": final_modules
        }

    finally:
        cursor.close()
        connection.close()
        
def get_selected_review_approval(course_id,company_code):
    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    try:
        cursor.callproc("lms_get_selected_review_approval", (course_id,))
        result = cursor.fetchall()

        if not result:
            return jsonify({"message": "No review/approval data found for this course."}), 200

        return jsonify({"review_approval_details": result}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        connection.close()
    
    
    

def lms_get_course_details():
    data = request.json
    course_id = data.get('courseId')
    company_code = data.get('company_code')

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    try:
        # ---------------------------------------------------
        # 1. FETCH COURSE BASIC DETAILS
        # ---------------------------------------------------
        course_query = """
            SELECT 
                c.id,
                c.course_name,
                c.course_description,
                c.difficulty_id,
                c.dept_id,
                c.tags,
                c.prerequisites,
                c.thumbnail,
                c.reviewer_id,
                c.approver_id
            FROM lms_course c
            WHERE c.d = %s
        """
        cursor.execute(course_query, (course_id,))
        course = cursor.fetchone()

        if not course:
            return jsonify({"error": "Course not found"}), 404

        # ---------------------------------------------------
        # 2. FETCH MODULES
        # ---------------------------------------------------
        module_query = """
            SELECT 
                module_id,
                title,
                description
            FROM lms_modules
            WHERE course_id = %s
            ORDER BY module_id ASC
        """
        cursor.execute(module_query, (course_id,))
        modules = cursor.fetchall()

        # ---------------------------------------------------
        # 3. FETCH SECTIONS FOR EACH MODULE
        # ---------------------------------------------------
        module_list = []

        for module in modules:
            section_query = """
                SELECT 
                    section_id,
                    title,
                    description,
                    video,
                    document,
                    resources
                FROM lms_sections
                WHERE module_id = %s
                ORDER BY section_id ASC
            """
            cursor.execute(section_query, (module['module_id'],))
            sections = cursor.fetchall()

            # Ensure resources is always consistent
            for sec in sections:
                if sec.get("resources"):
                    try:
                        # if stored as JSON string → keep as string (frontend handles)
                        json.loads(sec["resources"])
                    except:
                        sec["resources"] = "[]"
                else:
                    sec["resources"] = "[]"

            module_list.append({
                "title": module["title"],
                "description": module["description"],
                "sections": sections
            })

        # ---------------------------------------------------
        # 4. FINAL RESPONSE
        # ---------------------------------------------------
        response = {
            "course": {
                "course_name": course["course_name"],
                "course_description": course["course_description"],
                "difficulty_id": course["difficulty_id"],
                "dept_id": course["dept_id"],
                "tags": course["tags"],
                "prerequisites": course["prerequisites"],
                "thumbnail": course["thumbnail"],
                "reviewer_id": course["reviewer_id"],
                "approver_id": course["approver_id"]
            },
            "modules": module_list
        }

        return jsonify(response), 200

    except Exception as e:
        print("ERROR in get_course_details:", str(e))
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        cursor.close()
        connection.close()
        
        
def lms_get_all_levels(company_code):
    connection = get_connection(database=company_code)  # no company_code needed (global lookup table)
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    try:
        query = """
            SELECT 
                id,
                level_name
            FROM lms_difficulty_level
            ORDER BY id ASC
        """
        cursor.execute(query)
        levels = cursor.fetchall()

        return jsonify({
            "difficulty_levels": levels
        }), 200

    except Exception as e:
        print("ERROR in get_all_levels:", str(e))
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        cursor.close()
        connection.close() 
        
def lms_get_reviewers_approvers():
    data = request.json
    company_code = data.get('company_code')

    connection = get_connection(database=company_code)
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    try:
        # ---------------------------------------------------
        # 1. FETCH REVIEWERS
        # ---------------------------------------------------
        reviewers_query = """
            SELECT DISTINCT
                ct.reviewer_empid AS id,
                TRIM(
                    CONCAT_WS(' ',
                        e.firstname,
                        e.middlename,
                        e.lastname
                    )
                ) AS name
            FROM lms_course_tracker ct
            JOIN employee e 
                ON e.id = ct.reviewer_empid
            WHERE ct.urn = %s ;
        """
        cursor.execute(reviewers_query)
        reviewers = cursor.fetchall()

        # ---------------------------------------------------
        # 2. FETCH APPROVERS
        # ---------------------------------------------------
        approvers_query = """
            SELECT DISTINCT
                ct.approver_empid AS id,
                TRIM(
                    CONCAT_WS(' ',
                        e.firstname,
                        e.middlename,
                        e.lastname
                    )
                ) AS name
            FROM lms_course_tracker ct
            JOIN employee e 
                ON e.id = ct.approver_empid
            WHERE ct.urn = %s ;
        """
        cursor.execute(approvers_query)
        approvers = cursor.fetchall()

        # ---------------------------------------------------
        # 3. FINAL RESPONSE
        # ---------------------------------------------------
        return jsonify({
            "reviewers": reviewers,
            "approvers": approvers
        }), 200

    except Exception as e:
        print("ERROR in get_reviewers_approvers:", str(e))
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        cursor.close()
        connection.close()

def delete_modules():
    import traceback

    data = request.get_json()
    print("🔥 DELETE PAYLOAD:", data)

    module_ids = list(set(data.get("module_ids", [])))
    company_code = data.get("company_code")

    if not module_ids:
        return jsonify({"message": "No modules to delete"}), 200

    conn = get_connection(company_code)
    cursor = conn.cursor()

    try:
        # 1️⃣ Delete modules
        placeholders = ','.join(['%s'] * len(module_ids))
        cursor.execute(f"""
            UPDATE lms_modules 
            SET is_deleted = 1 
            WHERE id IN ({placeholders})
        """, module_ids)

        # 2️⃣ Get section IDs
        cursor.execute(f"""
            SELECT id FROM lms_sections 
            WHERE module_id IN ({placeholders})
        """, module_ids)

        section_rows = cursor.fetchall()
        print("🔥 RAW SECTION ROWS:", section_rows)

        section_ids = [row['id'] for row in section_rows]

        # 🚨 CRITICAL CHECK
        if section_ids:
            sec_placeholders = ','.join(['%s'] * len(section_ids))

            # 3️⃣ Delete sections
            cursor.execute(f"""
                UPDATE lms_sections 
                SET is_deleted = 1 
                WHERE id IN ({sec_placeholders})
            """, section_ids)

            # 4️⃣ Delete resources
            cursor.execute(f"""
                UPDATE lms_course_resource 
                SET is_deleted = 1 
                WHERE section_id IN ({sec_placeholders})
            """, section_ids)

        conn.commit()
        return jsonify({"message": "Modules deleted successfully"})

    except Exception as e:
        conn.rollback()
        print("❌ FULL ERROR:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()

def delete_sections():
    data = request.get_json()
    section_ids = data.get("section_ids", [])
    company_code = data.get("company_code")

    conn = get_connection(company_code)
    cursor = conn.cursor()

    query = f"""
        UPDATE lms_sections 
        SET is_deleted = 1 
        WHERE id IN ({','.join(['%s']*len(section_ids))})
    """
    cursor.execute(query, section_ids)

    conn.commit()
    return jsonify({"message": "Sections deleted"})

def delete_resources():
    data = request.get_json()
    resource_ids = data.get("resource_ids", [])
    company_code = data.get("company_code")

    conn = get_connection(company_code)
    cursor = conn.cursor()

    query = f"""
        UPDATE lms_course_resource 
        SET is_deleted = 1 
        WHERE id IN ({','.join(['%s']*len(resource_ids))})
    """
    cursor.execute(query, resource_ids)

    conn.commit()
    return jsonify({"message": "Resources deleted"})

        
def send_course_reviewer_rejection_email(instructor_email,course_name,instructor_name,reviewer_name,company_code):
        subject = f"Course Review Update – Revisions Required for {course_name}"
        instructor_greeting = f"Dear {instructor_name}," if instructor_name else "Dear Instructor,"

        body = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

                <p>{instructor_greeting}</p>

                <p>
                    The course titled <b>{course_name}</b> has been reviewed by 
                    <b>{reviewer_name}</b>.
                </p>

                <p style="color:#d93025; font-weight:bold;">
                    Status: Revisions Required
                </p>

                <p>
                    You are requested to revise the course and make the necessary updates 
                    based on the feedback provided in the Learning Management System.
                </p>

                <p>
                    <a href="https://sreeb.spryple.com/" target="_blank" 
                    style="color: #1a73e8; text-decoration: none; font-weight: bold;">
                    Access LMS
                    </a>
                </p>

                <p>
                    Once the updates are completed, please resubmit the course for review.
                </p>

                <p>Best regards,<br>
                <b>{reviewer_name}</b><br>
                LMS Reviewer<br>
                {company_code}</p>

            </body>
            </html>
        """

        return send_email(instructor_email, subject, body)
    
def send_course_approver_rejection_email(
    instructor_email,
    course_name,
    instructor_name,
    approver_name,
    company_code
):
    subject = f"Course Approval Update – Revisions Required for {course_name}"

    instructor_greeting = f"Dear {instructor_name}," if instructor_name else "Dear Instructor,"

    body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

        <p>{instructor_greeting}</p>

        <p>
            The course titled <b>{course_name}</b> has been reviewed by 
            <b>{approver_name}</b>.
        </p>

        <p style="color:#d93025; font-weight:bold;">
            Status: Revisions Required (Approval Stage)
        </p>

        <p>
            The course requires further updates before it can be approved.
            Kindly review the feedback provided in the Learning Management System
            and make the necessary changes.
        </p>

        <p>
            <a href="https://sreeb.spryple.com/" target="_blank" 
            style="color: #1a73e8; text-decoration: none; font-weight: bold;">
            Access LMS
            </a>
        </p>

        <p>
            Once the updates are completed, please resubmit the course for approval.
        </p>

        <p>If you need any clarification, please reach out to the approver.</p>

        <p>Best regards,<br>
        <b>{approver_name}</b><br>
        Approver<br>
        {company_code}</p>

    </body>
    </html>
    """

    return send_email(instructor_email, subject, body)
            
def lms_reviewer_reject_course():
    try:
        data = request.json

        course_id = data.get('course_id')
        empId = data.get('empId')
        suggestions = data.get('suggestions')
        company_code = data.get('company_code')
        currentTab = data.get('currentTab')
        status = data.get('status')

        # ✅ Validate required fields (allow empty suggestions)
        if not all([course_id, empId, company_code, currentTab, status]):
            return jsonify({
                "error": "Missing required fields: course_id, empId, company_code, currentTab, status"
            }), 400

        print("Received rejection request:", {
            "course_id": course_id, 
            "empId": empId,
            "suggestions": suggestions,
            "company_code": company_code,
            "currentTab": currentTab,
            "status": status
        })
        
        if currentTab == "Under Review" and status == "rejected":
            print("Invalid rejection attempt: currentTab =", currentTab, "status =", status)
            reviewer_suggestions_json = json.dumps({'suggestions': suggestions or ""})
            approver_json = json.dumps({})

            connection = None
            cursor = None

            try:
                connection = get_connection(database=company_code)
                cursor = connection.cursor(pymysql.cursors.DictCursor)

                query = """
                    SELECT 
                        ct.*,
                        c.instructor_id
                    FROM 
                        lms_course_tracker ct
                    JOIN 
                        lms_course c ON c.id = ct.urn
                    WHERE 
                        ct.urn = %s
                    ORDER BY 
                        ct.timestamp DESC
                    LIMIT 1
                """

                cursor.execute(query, (course_id,))
                tracker_entry = cursor.fetchone()

                print("Fetched tracker entry:", tracker_entry)

                if not tracker_entry:
                    return jsonify({"error": "No tracker entry found"}), 404

                # ✅ Insert new version with rejection
                cursor.callproc(
                    "lms_add_version_details",
                    (
                        course_id,
                        tracker_entry["version"],
                        tracker_entry["reviewer_empid"],
                        tracker_entry["approver_empid"],
                        2,  # Rejected by reviewer
                        reviewer_suggestions_json,
                        approver_json,
                    )
                )

                connection.commit()

                # 🔥 OPTIONAL: Fetch instructor + reviewer details for email
                cursor.execute("""
                    SELECT 
                        c.course_name,
                        CONCAT_WS(' ', i.firstname, NULLIF(i.middlename,''), i.lastname) AS instructor_name,
                        i.officeemail AS instructor_email,
                        CONCAT_WS(' ', r.firstname, NULLIF(r.middlename,''), r.lastname) AS reviewer_name
                    FROM lms_course c
                    JOIN employee i ON i.id = %s
                    JOIN employee r ON r.id = %s
                    WHERE c.id = %s
                """, ( tracker_entry["instructor_id"], empId,course_id))

                email_data = cursor.fetchone()
                print("Fetched email data:", email_data)

                if email_data:
                    send_course_reviewer_rejection_email(
                        instructor_email=email_data["instructor_email"],
                        course_name=email_data["course_name"],
                        instructor_name=email_data["instructor_name"],
                        reviewer_name=email_data["reviewer_name"],
                        company_code=company_code
                    )

                return jsonify({
                    "status": True,
                    "message": "Course rejected and suggestions saved successfully"
                }), 200

            except Exception as e:
                if connection:
                    connection.rollback()
                print(f"Error in lms_reviewer_reject_course: {str(e)}")
                import traceback
                traceback.print_exc()
                return jsonify({"error": str(e)}), 500

            finally:
                if cursor:
                    cursor.close()
                if connection:
                    connection.close()
                    
        else:  # Approver rejection (same endpoint, different flow)
            approver_suggestions_json = json.dumps({'suggestions': suggestions or {}})
            reviewer_json = json.dumps({})
            connection = None
            cursor = None
            try:
                connection = get_connection(database=company_code)
                cursor = connection.cursor(pymysql.cursors.DictCursor)

                query = """
                    SELECT 
                        ct.*,
                        c.instructor_id
                    FROM 
                        lms_course_tracker ct
                    JOIN 
                        lms_course c ON c.id = ct.urn
                    WHERE 
                        ct.urn = %s
                    ORDER BY 
                        ct.timestamp DESC
                    LIMIT 1
                """

                cursor.execute(query, (course_id,))
                tracker_entry = cursor.fetchone()

                print("Fetched tracker entry for approver rejection:", tracker_entry)

                if not tracker_entry:
                    return jsonify({"error": "No tracker entry found"}), 404

                # ✅ Insert new version with rejection
                cursor.callproc(
                    "lms_add_version_details",
                    (
                        course_id,
                        tracker_entry["version"],
                        tracker_entry["reviewer_empid"],
                        tracker_entry["approver_empid"],
                        5,  # Rejected by approver
                        reviewer_json,
                        approver_suggestions_json,
                    )
                )

                connection.commit()
                
                cursor.execute("""
                    SELECT
                        c.course_name,
                        CONCAT_WS(' ', i.firstname, NULLIF(i.middlename,''), i.lastname) AS instructor_name,
                        i.officeemail AS instructor_email,
                        CONCAT_WS(' ', a.firstname, NULLIF(a.middlename,''), a.lastname) AS approver_name
                    FROM lms_course c
                    JOIN employee i ON i.id = %s
                    JOIN employee a ON a.id = %s
                    WHERE c.id = %s
                """, (tracker_entry["instructor_id"], tracker_entry["approver_empid"], course_id))

                email_data = cursor.fetchone()
                print("Fetched email data:", email_data)

                if email_data:
                    send_course_approver_rejection_email(
                        instructor_email=email_data["instructor_email"],
                        course_name=email_data["course_name"],
                        approver_name=email_data["approver_name"],
                        instructor_name=email_data["instructor_name"],
                        company_code=company_code
                    )


                return jsonify({
                    "status": True,
                    "message": "Course rejected by approver and suggestions saved successfully"
                }), 200
            
            except Exception as e:
                if connection:
                    connection.rollback()
                print(f"Error in lms_approver_reject_course: {str(e)}")
                import traceback
                traceback.print_exc()
                return jsonify({"error": str(e)}), 500
            
            finally:
                if cursor:
                    cursor.close()
                if connection:
                    connection.close()
            
    except Exception as e:
        print(f"Error in lms_reviewer_reject_course (outer): {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

def lms_instructor_submit_course():
    data = request.get_json()

    course_id     = data.get("course_id")
    instructor_id = data.get("instructor_id")
    reviewer_id   = data.get("reviewer_id")
    approver_id   = data.get("approver_id")
    company_code  = data.get("company_code")

    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    missing = [
        f for f, v in {
            "course_id":     course_id,
            "instructor_id": instructor_id,
            "reviewer_id":   reviewer_id,
            "approver_id":   approver_id
        }.items() if not v
    ]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    connection = None
    cursor     = None

    try:
        connection = get_connection(database=company_code)
        cursor     = connection.cursor(pymysql.cursors.DictCursor)

        cursor.callproc(
            "lms_instructor_submit_course",
            (course_id, reviewer_id, approver_id)
        )

        result = cursor.fetchone()
        connection.commit()

        if not result:
            return jsonify({
                "status": False,
                "error": "No response from database procedure"
            }), 500

        # ── Fetch all needed details in one query ──────────────────
        cursor.execute("""
            SELECT
                c.course_name,

                CONCAT_WS(' ', i.firstname, NULLIF(i.middlename,''), i.lastname) AS instructor_name,

                CONCAT_WS(' ', r.firstname, NULLIF(r.middlename,''), r.lastname) AS reviewer_name,
                r.officeemail AS reviewer_email

            FROM lms_course c
            JOIN employee i ON i.id = %s
            JOIN employee r ON r.id = %s
            LEFT JOIN (
                SELECT urn, status_code
                FROM lms_course_tracker
                WHERE urn = %s
                ORDER BY timestamp DESC
                LIMIT 1
            ) ct ON ct.urn = c.id
            WHERE c.id = %s
        """, (instructor_id, reviewer_id, course_id, course_id))

        email_data = cursor.fetchone()

        if email_data:
            course_name     = email_data["course_name"]
            instructor_name = email_data["instructor_name"]

            if email_data.get("reviewer_email"):
                send_course_review_email(
                    employee_email=email_data["reviewer_email"],
                    course_name=course_name,
                    reviewer_name=email_data["reviewer_name"],
                    instructor_name=instructor_name,
                    company_code=company_code
                )

        return jsonify({
            "status":       True,
            "message":      "Course submitted successfully",
            "tracker_id":   result.get("id"),
            "course_id":    result.get("course_id"),
            "new_version":  result.get("new_version"),
            "status_code":  result.get("status_code"),
            "submitted_at": str(result.get("submitted_at"))
        }), 200

    except Exception as e:
        if connection:
            connection.rollback()
        import traceback
        traceback.print_exc()
        return jsonify({"status": False, "error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()   
    
def send_course_approval_request_email(approver_email,course_name,approver_name,reviewer_name,company_code):
    subject = f"Approval Required – Course {course_name}"

    approver_greeting = f"Dear {approver_name}," if approver_name else "Dear Approver,"

    body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

        <p>{approver_greeting}</p>

        <p>
            The course titled <b>{course_name}</b> has been reviewed and approved by 
            <b>{reviewer_name}</b>.
        </p>

        <p style="color:#188038; font-weight:bold;">
            Status: Awaiting Your Approval
        </p>

        <p>
            You are requested to review the course and provide your approval to proceed further.
        </p>

        <p>
            <a href="https://sreeb.spryple.com/" target="_blank" 
            style="color: #1a73e8; text-decoration: none; font-weight: bold;">
            Access LMS
            </a>
        </p>

        <p>
            Kindly review the course at your earliest convenience.
        </p>

        <p>If you require any assistance, please contact the LMS support team.</p>

        <p>Best regards,<br>
        <b>{reviewer_name}</b><br>
        Reviewer<br>
        {company_code}</p>

    </body>
    </html>
    """

    return send_email(approver_email, subject, body)

def send_course_approver_approved_email(
    instructor_email,
    course_name,
    instructor_name,
    approver_name,
    company_code
):
    subject = f"Course Approved – {course_name}"

    instructor_greeting = f"Dear {instructor_name}," if instructor_name else "Dear Instructor,"

    body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

        <p>{instructor_greeting}</p>

        <p>
            We are pleased to inform you that your course 
            <b>{course_name}</b> has been successfully approved by 
            <b>{approver_name}</b>.
        </p>

        <p style="color:#188038; font-weight:bold;">
            Status: Approved
        </p>

        <p>
            The course has now completed the review and approval process and is ready 
            for publication / learner access as per the LMS workflow.
        </p>

        <p>
            <a href="https://sreeb.spryple.com/" target="_blank" 
            style="color: #1a73e8; text-decoration: none; font-weight: bold;">
            Access LMS
            </a>
        </p>

        <p>
            Thank you for your efforts in creating and improving the course content.
        </p>

        <p>If you need any assistance, feel free to contact the LMS support team.</p>

        <p>Best regards,<br>
        <b>{approver_name}</b><br>
        Approver<br>
        {company_code}</p>

    </body>
    </html>
    """

    return send_email(instructor_email, subject, body)

def bump_version(version):
    major = int(version.split('.')[0])
    return f"{major + 1}.0"


def lms_reviewer_approve_course():
    try:
        data = request.json

        course_id = data.get('course_id')
        empId = data.get('empId')  # reviewer
        company_code = data.get('company_code')
        currentTab = data.get('currentTab')
        status = data.get('status')

        # ✅ Validation
        if not all([course_id, empId, company_code, currentTab, status]):
            return jsonify({
                "error": "Missing required fields: course_id, empId, company_code, currentTab, status"
            }), 400

        if currentTab == "Under Review" and status == "approved":
            

            reviewer_suggestions_json = json.dumps({})  # no suggestions on approve
            approver_json = json.dumps({})

            connection = None
            cursor = None

            try:
                connection = get_connection(database=company_code)
                cursor = connection.cursor(pymysql.cursors.DictCursor)

                # ✅ Fetch latest tracker + instructor
                query = """
                    SELECT 
                        ct.*,
                        c.instructor_id
                    FROM 
                        lms_course_tracker ct
                    JOIN 
                        lms_course c ON c.id = ct.urn
                    WHERE 
                        ct.urn = %s
                    ORDER BY 
                        ct.timestamp DESC
                    LIMIT 1
                """

                cursor.execute(query, (course_id,))
                tracker_entry = cursor.fetchone()

                print("Fetched tracker entry:", tracker_entry)

                if not tracker_entry:
                    return jsonify({"error": "No tracker entry found"}), 404

                # ✅ Insert new version (APPROVED BY REVIEWER)
                cursor.callproc(
                    "lms_add_version_details",
                    (
                        course_id,
                        tracker_entry["version"],
                        tracker_entry["reviewer_empid"],
                        tracker_entry["approver_empid"],
                        3,  # ✅ status_code for "Approved by reviewer"
                        reviewer_suggestions_json,
                        approver_json,
                    )
                )

                connection.commit()

                # 🔥 Fetch details for email (send to approver OR instructor)
                cursor.execute("""
                    SELECT 
                        c.course_name,

                        CONCAT_WS(' ', i.firstname, NULLIF(i.middlename,''), i.lastname) AS instructor_name,
                        i.officeemail AS instructor_email,

                        CONCAT_WS(' ', r.firstname, NULLIF(r.middlename,''), r.lastname) AS reviewer_name,

                        CONCAT_WS(' ', a.firstname, NULLIF(a.middlename,''), a.lastname) AS approver_name,
                        a.officeemail AS approver_email

                    FROM lms_course c
                    JOIN employee i ON i.id = %s
                    JOIN employee r ON r.id = %s
                    JOIN employee a ON a.id = %s
                    WHERE c.id = %s
                """, (
                    tracker_entry["instructor_id"],
                    empId,
                    tracker_entry["approver_empid"],
                    course_id
                ))

                email_data = cursor.fetchone()
                print("Fetched email data:", email_data)

                # ✅ Send email to approver (next step in flow)
                if email_data and email_data.get("approver_email"):
                    send_course_approval_request_email(
                        approver_email=email_data["approver_email"],
                        course_name=email_data["course_name"],
                        approver_name=email_data["approver_name"],
                        reviewer_name=email_data["reviewer_name"],
                        company_code=company_code
                    )

                return jsonify({
                    "status": True,
                    "message": "Course approved by reviewer and forwarded to approver"
                }), 200

            except Exception as e:
                if connection:
                    connection.rollback()
                print(f"Error in lms_reviewer_approve_course: {str(e)}")
                import traceback
                traceback.print_exc()
                return jsonify({"error": str(e)}), 500

            finally:
                if cursor:
                    cursor.close()
                if connection:
                    connection.close()
        
        else:
            approver_suggestions_json = json.dumps({})
            reviewer_json = json.dumps({})
            
            connection = None
            cursor = None
            
            try:
                connection = get_connection(database=company_code)
                cursor = connection.cursor(pymysql.cursors.DictCursor)

                query = """
                    SELECT 
                        ct.*,
                        c.instructor_id
                    FROM 
                        lms_course_tracker ct
                    JOIN 
                        lms_course c ON c.id = ct.urn
                    WHERE 
                        ct.urn = %s
                    ORDER BY 
                        ct.timestamp DESC
                    LIMIT 1
                """

                cursor.execute(query, (course_id,))
                tracker_entry = cursor.fetchone()

                print("Fetched tracker entry for approver approval:", tracker_entry)

                if not tracker_entry:
                    return jsonify({"error": "No tracker entry found"}), 404
                
                print("Current version before approval :", tracker_entry["version"])
                
                bumped_version = bump_version(tracker_entry["version"])   
                
                print("Bumped version for approver approval:", bumped_version)

                # ✅ Insert new version with approval by approver
                cursor.callproc(
                    "lms_add_version_details",
                    (
                        course_id,
                        tracker_entry["version"],
                        tracker_entry["reviewer_empid"],
                        tracker_entry["approver_empid"],
                        6,  # Approved by approver
                        reviewer_json,
                        approver_suggestions_json,
                    )
                )
                
                cursor.execute("""
                    SELECT
                        c.course_name,
                        CONCAT_WS(' ', i.firstname, NULLIF(i.middlename,''), i.lastname) AS instructor_name,
                        i.officeemail AS instructor_email,
                        CONCAT_WS(' ', a.firstname, NULLIF(a.middlename,''), a.lastname) AS approver_name
                    FROM lms_course c
                    JOIN employee i ON i.id = %s
                    JOIN employee a ON a.id = %s
                    WHERE c.id = %s
                """, (tracker_entry["instructor_id"], tracker_entry["approver_empid"], course_id))
                
                email_data = cursor.fetchone()
                print("Fetched email data for approver approval:", email_data)
                
                
                
                cursor.callproc(
                    "lms_add_version_details",
                    (
                        course_id,
                        bumped_version,
                        tracker_entry["reviewer_empid"],
                        tracker_entry["approver_empid"],
                        7,  # published course
                        reviewer_json,
                        approver_suggestions_json,
                    )
                )

                connection.commit()
                
                # ✅ Send email to approver (next step in flow)
                if email_data and email_data.get("instructor_email"):
                    send_course_approver_approved_email(
                        instructor_email=email_data["instructor_email"],
                        course_name=email_data["course_name"],
                        instructor_name=email_data["instructor_name"],
                        approver_name=email_data["approver_name"],
                        company_code=company_code
                    )

                return jsonify({
                    "status": True,
                    "message": "Course approved successfully"
                }), 200
                
            except Exception as e:
                if connection:
                    connection.rollback()
                print(f"Error in lms_approver_approve_course: {str(e)}")
                import traceback
                traceback.print_exc()
                return jsonify({"error": str(e)}), 500
            
            finally:
                if cursor:
                    cursor.close()
                if connection:
                    connection.close()
                
    except Exception as e:
        print(f"Error in lms_reviewer_approve_course (outer): {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500            

def lms_get_manager_summary_reports():
    company_code = request.args.get('company_code')
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    course_name     = request.args.get('course_name')   or ''
    date_from       = request.args.get('date_from')     or ''
    date_to         = request.args.get('date_to')       or ''
    empid           = request.args.get('empid')  
    role            = request.args.get('role')          or ''
    status          = request.args.get('status')        or ''

    print("Received parameters for edit course report:", {
        "company_code": company_code,
        "course_name": course_name,
        "date_from": date_from,
        "date_to": date_to,
        "empid": empid,
        "role": role,
        "status": status
        
    })
    
    connection = None
    cursor = None
    try:
        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        cursor.callproc(
            "lms_get_manager_summary_report",
            (empid,role,course_name,  date_from, date_to)
        )

        report = cursor.fetchall()
        
        print("Fetched edit course report:", report) 

        # ✅ Empty result is still valid — means no matching records
        return jsonify({"message": "Success", "count": len(report), "data": report}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"[ERROR] lms_get_edit_course_report: {str(e)}")
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:     cursor.close()
        if connection: connection.close()
        
def lms_get_course_names(company_code):
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    connection = None
    cursor = None
    try:
        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT id, course_name FROM lms_course ORDER BY course_name ASC")
        courses = cursor.fetchall()
        return jsonify({"courses": courses}), 200

    except Exception as e:
        print(f"[ERROR] lms_get_course_names: {str(e)}")
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:   cursor.close()
        if connection: connection.close()
        
def lms_get_manager_summary_report_courses_filter():
    data = request.get_json()
    empid = data.get("empid")
    role = data.get("role")
    company_code = data.get("company_code")
    connection = None
    cursor = None

    try:
        # ✅ Validation
        if not empid or not company_code:
            return jsonify({"error": "empid and company_code are required"}), 400

        # default role
        role = role if role else 'All'

        # ✅ DB Connection
        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        # ✅ Call procedure with role
        cursor.callproc("lms_get_manager_courses_by_role", (empid, role))
        courses = cursor.fetchall()

        return jsonify({"courses": courses}), 200

    except Exception as e:
        print(f"[ERROR] lms_get_manager_courses_by_role: {str(e)}")

        if connection:
            connection.rollback()

        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def lms_get_course_details(urn,company_code):
    if not urn:
        return jsonify({
            "status": False,
            "message": "URN is required"
        }), 400

    cursor = None
    conn = None

    try:
        conn = get_connection(database=company_code)
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        # 🔥 Call Stored Procedure
        cursor.callproc('lms_get_detailed_course_summary_report', [urn])

        result = None

        # ✅ PyMySQL way to fetch results
        for res in cursor.fetchall():
            result = res
            break

        if not result:
            return jsonify({
                "status": False,
                "message": "No data found"
            })

        # 🔥 Parse JSON fields
        result['current_data'] = json.loads(result.get('current_data') or '{}')
        result['version_history'] = json.loads(result.get('version_history') or '[]')
        result['modules'] = json.loads(result.get('modules') or '[]')
        for module in result['modules']:
            for section in module.get('sections', []):
                content = section.get('content')

                if not content:
                    continue

                else:
                    # ✅ Generate S3 signed URL
                    try:
                        signed_url = generate_presigned_url(AWS_BUCKET_NAME, content)
                        section['content'] = signed_url
                    except Exception as e:
                        print("Error generating URL:", e)
                        section['content'] = None

        return jsonify({
            "status": True,
            "data": result
        })

    except pymysql.MySQLError as err:
        return jsonify({
            "status": False,
            "message": str(err)
        }), 500

    except Exception as e:
        return jsonify({
            "status": False,
            "message": str(e)
        }), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
            

def lms_get_instructor_summary_report_courses_filter():
    data = request.get_json()
    empid = data.get("empid")
    role = data.get("role")
    company_code = data.get("company_code")
    connection = None
    cursor = None

    try:
        # ✅ Validation
        if not empid or not company_code:
            return jsonify({"error": "empid and company_code are required"}), 400

        # default role
        role = role if role else 'All'

        # ✅ DB Connection
        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        # ✅ Call procedure with role
        cursor.callproc("lms_get_instructor_summary_report_course", (empid, role))
        courses = cursor.fetchall()

        return jsonify({"courses": courses}), 200

    except Exception as e:
        print(f"[ERROR] lms_get_instructor_summary_report_course: {str(e)}")

        if connection:
            connection.rollback()

        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


def lms_get_instructor_summary_reports():
    data = request.get_json()
    print("Received request for instructor summary reports with data:", data)   
    # company_code = request.args.get('company_code')
    # if not company_code:
    #     return jsonify({"error": "company_code is required"}), 400

    # course_name     = request.args.get('course_name')   or ''
    # date_from       = request.args.get('date_from')     or ''
    # date_to         = request.args.get('date_to')       or ''
    # empid           = request.args.get('empid')  
    # role            = request.args.get('role')          or ''
    # status          = request.args.get('status')        or ''
    
    company_code    = data.get("company_code")
    course_name     = data.get("course_name")   or ''
    date_from       = data.get("date_from")     or ''   
    date_to         = data.get("date_to")       or ''
    empid           = data.get("empid")
    role            = data.get("role")          or ''
    status          = data.get("status")        or ''
    
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    print("Received parameters for course report:", {
        "company_code": company_code,
        "course_name": course_name,
        "date_from": date_from,
        "date_to": date_to,
        "empid": empid,
        "role": role,
        "status": status
        
    })
    
    connection = None
    cursor = None
    try:
        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        cursor.callproc(
            "lms_get_instructor_summary_report",
            (empid,role,course_name,status,date_from, date_to)
        )

        report = cursor.fetchall()
        
        print("Fetched edit course report:", report) 

        # ✅ Empty result is still valid — means no matching records
        return jsonify({"message": "Success", "count": len(report), "data": report}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"[ERROR] lms_get_instructor_summary_report: {str(e)}")
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:     cursor.close()
        if connection: connection.close()
        
def lms_get_hr_summary_report_instructors_filter():
    data = request.get_json()
    empid = data.get("empid")
    role = data.get("role")
    company_code = data.get("company_code")
    connection = None
    cursor = None

    try:
        # ✅ Validation
        if not empid or not company_code:
            return jsonify({"error": "empid and company_code are required"}), 400

        # default role
        role = role if role else 'All'

        # ✅ DB Connection
        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        # ✅ Call procedure with role
        cursor.callproc("lms_get_all_instructor_names", (empid, role))
        instructors = cursor.fetchall()

        return jsonify({"instructors": instructors}), 200

    except Exception as e:
        print(f"[ERROR] lms_get_hr_summary_report_instructors_filter: {str(e)}")

        if connection:
            connection.rollback()

        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            
def lms_get_hr_summary_report_courses_filter():
    data = request.get_json()
    empid = data.get("empid")
    role = data.get("role")
    company_code = data.get("company_code")
    instructor_id = data.get("instructor_id")
    if instructor_id == '':
        instructor_id = 0
    connection = None
    cursor = None
    
    print("Received parameters for HR summary report courses filter:", {
        "empid": empid, 
        "role": role,
        "company_code": company_code,
        "instructor_id": instructor_id
    })

    try:
        # ✅ Validation
        if not empid or not company_code:
            return jsonify({"error": "empid and company_code are required"}), 400

        # default role
        role = role if role else 'All'

        # ✅ DB Connection
        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        # ✅ Call procedure with role
        cursor.callproc("lms_get_courses_by_instructor", (empid, role,instructor_id))
        courses = cursor.fetchall()

        return jsonify({"courses": courses}), 200

    except Exception as e:
        print(f"[ERROR] lms_get_hr_summary_report_courses_filter: {str(e)}")

        if connection:
            connection.rollback()

        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            
def lms_get_hr_summary_reports():
    data = request.get_json()
    print("Received request for HR summary reports with data:", data)   
    
    company_code    = data.get("company_code")
    course_name     = data.get("course_name")   or ''
    date_from       = data.get("date_from")     or ''   
    date_to         = data.get("date_to")       or ''
    empid           = data.get("empid")
    role            = data.get("role")          or ''
    status          = data.get("status")        or ''
    instructor_id   = data.get("instructor_id") or 0
    
    if not company_code:
        return jsonify({"error": "company_code is required"}), 400

    print("Received parameters for HR summary report:", {
        "company_code": company_code,
        "course_name": course_name,
        "date_from": date_from,
        "date_to": date_to,
        "empid": empid,
        "role": role,
        "status": status,
        "instructor_id": instructor_id
        
    })
    
    connection = None
    cursor = None
    try:
        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        cursor.callproc(
            "lms_get_hr_manager_summary_report",
            (empid,role,instructor_id,course_name,status,date_from, date_to)
        )

        report = cursor.fetchall()
        
        print("Fetched HR summary report:", report) 

        # ✅ Empty result is still valid — means no matching records
        return jsonify({"message": "Success", "count": len(report), "data": report}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"[ERROR] lms_get_hr_summary_report: {str(e)}")
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:     cursor.close()
        if connection: connection.close()