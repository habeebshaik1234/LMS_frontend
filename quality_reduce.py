import os
import shutil
import math
import ffmpeg
import boto3
import subprocess
from flask import Flask, jsonify, request
import mimetypes


AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
AWS_BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")
AWS_REGION = os.getenv("AWS_REGION")

s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY, region_name=AWS_REGION)

FFMPEG_PATH = "/usr/bin/ffmpeg"   
# FFMPEG_PATH = "C:/Users/Devorks/Downloads/ffmpeg/ffmpeg/bin/ffmpeg.exe"

if not os.path.isfile(FFMPEG_PATH):
    FFMPEG_PATH = shutil.which("ffmpeg")

if not FFMPEG_PATH or not os.path.isfile(FFMPEG_PATH):
    print("FFmpeg not found in system PATH or at /usr/bin/ffmpeg")
    raise EnvironmentError("FFmpeg not found. Please install FFmpeg or set it in PATH.")

os.environ["PATH"] += os.pathsep + os.path.dirname(FFMPEG_PATH)


def ensure_even_dimensions(width, height):
    return math.floor(width / 2) * 2, math.floor(height / 2) * 2

def upload_to_s3(file_path, bucket_name, s3_key):
    try:
        if not os.path.exists(file_path):
            return None

        content_type = mimetypes.guess_type(file_path)[0] or "application/octet-stream"

        s3.upload_file(
            file_path,
            bucket_name,
            s3_key,  
            ExtraArgs={"ContentType": content_type, "ContentDisposition": "inline"}
        )

        return s3_key  

    except Exception as e:
        print("S3 upload error:", e)
        return None


def reduce_video_quality(input_video_path, max_height=720):

    try:
        if not os.path.isfile(input_video_path):
            print(f"Error: Input video file not found: {input_video_path}")
            return jsonify({"error": f"Input video file not found: {input_video_path}"}), 400

        try:
            video_info = ffmpeg.probe(input_video_path)
            print(f"Video info retrieved successfully")
        except ffmpeg.Error as e:
            error_msg = e.stderr.decode() if hasattr(e, 'stderr') else str(e)
            print(f"FFmpeg probe error: {error_msg}")
            return jsonify({"error": f"FFmpeg probe error: {error_msg}"}), 500

        video_stream = next((s for s in video_info['streams'] if s['codec_type'] == 'video'), None)
        if not video_stream:
            print("Error: No video stream found in file")
            return jsonify({"error": "No video stream found in file"}), 400

        current_width = int(video_stream['width'])
        current_height = int(video_stream['height'])
        print(f"Video dimensions: {current_width}x{current_height}")

        output_video_path = input_video_path.replace(".mp4", "_compressed.mp4")

        if current_height > max_height:
            target_height = max_height
            target_width = int((current_width / current_height) * target_height)
            target_width, target_height = ensure_even_dimensions(target_width, target_height)
            print(f"Compressing to: {target_width}x{target_height}")

            cmd = [
                FFMPEG_PATH, "-i", input_video_path,
                "-vf", f"scale={target_width}:{target_height}",
                "-c:v", "libx264", "-preset", "fast", "-crf", "28",
                output_video_path, "-y"
            ]
            
            try:
                result = subprocess.run(cmd, check=True, capture_output=True, text=True)
                print(f"FFmpeg compression completed successfully")
            except subprocess.CalledProcessError as e:
                print(f"FFmpeg command failed: {e.stderr}")
                return jsonify({"error": f"FFmpeg processing error: {e.stderr}"}), 500

        else:
            print("Video already at target resolution, skipping compression")
            output_video_path = input_video_path  

        s3_file_name = os.path.basename(output_video_path)
        print(f"Uploading to S3: {s3_file_name}")
        s3_key = upload_to_s3(output_video_path, AWS_BUCKET_NAME, s3_file_name)
        
        if not s3_key:
            print("Error: Failed to upload video to S3")
            return jsonify({"error": "Failed to upload video to S3"}), 500

        print(f"Video uploaded successfully with key: {s3_key}")
        
        # DON'T clean up temp files yet - question generation needs the original file
        # Cleanup will happen in the calling function
        print(f"Keeping temp files for question generation")
        
        return s3_key, None

    except subprocess.CalledProcessError as ffmpeg_error:
        error_msg = str(ffmpeg_error)
        print(f"FFmpeg processing error: {error_msg}")
        return jsonify({"error": f"FFmpeg processing error: {error_msg}"}), 500
    except Exception as e:
        error_msg = str(e)
        print(f"Unexpected error in reduce_video_quality: {error_msg}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Unexpected error: {error_msg}"}), 500

def reduce_quality():
    try:
        data = request.json
        input_video_path = data.get("input_video_path")
        print(f"Compression endpoint received request for: {input_video_path}")
        
        # Check if file exists immediately when endpoint is called
        if input_video_path and os.path.exists(input_video_path):
            print(f"File exists at compression endpoint: {os.path.getsize(input_video_path)} bytes")
        s3_key, error = reduce_video_quality(input_video_path)
        if error:
            return jsonify({"error": error}), 500
        return jsonify({"compressed_video_key": s3_key}), 200
            
        if not input_video_path:
            return jsonify({"error": "Missing input_video_path"}), 400
        return reduce_video_quality(input_video_path)
    except Exception as e:
        print(f"Error in reduce_quality: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
