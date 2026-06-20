from flask import Flask, jsonify, request, send_file
from datetime import datetime, timedelta, date
import os
from langchain_groq import ChatGroq
from flask_cors import CORS
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from functools import wraps

import re
from flask import Flask, request, jsonify, send_file
import io
import json

from api_functions import search_employees
from  extract_questions import  process_video
from   thumbnail  import   generate_thumbnail
from  recommendation  import  recommendations
from config import  get_connection
from quality_reduce import reduce_quality
from document import process_document
from api_functions import *
from cron_jobs import start_cron_jobs
from bulk_processor import lms_bulk_add_sections



from flask_cors import CORS, cross_origin
import jwt
from datetime import datetime, timedelta
from jose import jwt as ms_jwt, jwk  

#lms_add_course,  lms_add_module, lms_add_section, get_courses, get_modules, get_sections, lms_add_resource, get_user_dashboard, assign_course, get_categories, get_difficulty_levels, get_employee_dashboard, get_manager_dashboard

app = Flask(__name__)
import bulk_processor
bulk_processor.flask_app = app

# Increase max upload size to 2GB and set request timeout
app.config['MAX_CONTENT_LENGTH'] = 2 * 1024 * 1024 * 1024  # 2GB
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['REQUEST_TIMEOUT'] = 1800  # 30 minutes for bulk uploads

CORS(app)

CORS(app, resources={r"/*": {
     "origins": "*",
    "allow_headers": ["Content-Type", "Authorization"],
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "supports_credentials": True
}})

SECRET_KEY  = os.getenv("SECRET_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL")

llm = ChatGroq(api_key = GROQ_API_KEY, model=LLM_MODEL, temperature=0.5)

def validate_token(token):
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded_token
    except Exception as e:
        return {"error": "Token has expired"}
    except jwt.InvalidTokenError:
        return {"error": "Invalid token"}

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"status": False, "message": "Token is missing"}), 403

        try:
            token = token.split(" ")[1] if " " in token else token
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except ExpiredSignatureError:
            return jsonify({"status": False, "message": "Token has expired"}), 401
        except InvalidTokenError:
            return jsonify({"status": False, "message": "Invalid token"}), 401
        except Exception as e:
            import traceback
            traceback.print_exc()
            print(f"Token validation error: {e}")
            return jsonify({"status": False, "message": "Token validation error"}), 401

        return f(*args, **kwargs)
    return decorated


@app.route('/lms_add_course', methods=['POST'])
@token_required
def addcourse():
    add = lms_add_course()  
    return add

@app.route('/lms_add_module', methods=['POST'])
@token_required
def delcourse():
    module = lms_add_module()  
    return module

@app.route("/lms_add_section", methods=['POST'])
@token_required
def add_section():
    section = lms_add_section()
    return section

@app.route("/lms_add_questions", methods=['POST'])
@token_required
def add_questions():
    return lms_add_question()

@app.route("/lms_module_status/<string:company_code>", methods=['GET'])
@token_required
def module_status(company_code):
    status = get_module_status(company_code)
    return status

@app.route("/lms_add_resources", methods=['POST'])
def add_resource():
    resource = lms_add_resource()
    return resource

@app.route("/lms_assign_course", methods=['POST'])
@token_required
def assign_courses():
    assign = assign_course()
    return assign

@app.route("/lms_enroll_user", methods=['POST'])
@token_required
def enroll_course():
    enroll = enroll_user()
    return enroll

@app.route("/save_points_details", methods=['POST'])
@token_required
def save_points_api():
    return save_points_details()

@app.route("/lms_set_scoreconfig", methods=["POST"])
@token_required
def set_scoreconfig():
    return  set_scoreconfigur()

@app.route("/lms_set_avatars", methods=["POST"])
@token_required
def set_avatar():
    return  set_avatars()

@app.route("/lms_get_avatars/<string:company_code>", methods=["GET"])
@token_required
def avatars(company_code):
    return  get_avatars(company_code)


@app.route("/lms_employee_avatar/<int:user_id>/<string:company_code>", methods=['GET'])
@token_required
def employee_avatars(user_id, company_code):
    avatar = get_employee_avatar(user_id, company_code)
    return avatar

@app.route("/departments/<string:company_code>", methods=["GET"])
@token_required
def departments(company_code):
    dept = get_departments(company_code)
    return dept

@app.route("/lms_scoreconfig/<string:company_code>", methods=["GET"]) 
@token_required
def scoreconfig(company_code):
    return  get_scoreconfig(company_code)

@app.route("/lms_get_instructors/<string:company_code>", methods=["GET"])
@token_required
def get_instructor(company_code):
    return  get_instructors(company_code)


@app.route("/lms_get_coursestatus/<string:company_code>", methods=["GET"])
@token_required
def get_coursestat(company_code):
    return  get_coursestatus(company_code)

@app.route("/time_filters/<string:company_code>", methods = ['GET'])
@token_required
def time_filtration(company_code):
    return get_time_filter(company_code)

@app.route("/difficulty_levels/<string:company_code>", methods=["GET"])
@token_required
def difficulty_level(company_code):
    level = get_difficulty_levels(company_code)
    return level

@app.route('/lms_get_courses/<course_ids>/<int:user_id>/<int:category_id>/<int:difficulty_level_id>/<int:time_filter_id>/<int:instructor_id>/<int:status_id>/<string:company_code>', methods=['GET'])
@token_required
def get_course(course_ids, user_id, category_id, difficulty_level_id, time_filter_id, instructor_id, status_id, company_code):
    return get_courses(course_ids, user_id, category_id, difficulty_level_id, time_filter_id, instructor_id, status_id, company_code)

@app.route('/lms_get_published_courses/<course_ids>/<int:user_id>/<int:category_id>/<int:difficulty_level_id>/<int:time_filter_id>/<int:instructor_id>/<int:status_id>/<string:company_code>', methods=['GET'])
@token_required
def get_published_course(course_ids, user_id, category_id, difficulty_level_id, time_filter_id, instructor_id, status_id, company_code):
    return get_published_courses(course_ids, user_id, category_id, difficulty_level_id, time_filter_id, instructor_id, status_id, company_code)


@app.route("/lms_get_questions/<int:section_id>/<string:company_code>", methods=['GET'])
@token_required
def get_questions(section_id, company_code):
    questions = get_section_questions(section_id, company_code)
    return questions

@app.route("/lms_get_reports/<string:branch_id>/<string:dept_id>/<string:manager_id>/<string:emp_id>/<string:from_date>/<string:to_date>/<string:company_code>", methods = ['GET'])
@token_required
def lms_progress_reports(branch_id, dept_id, manager_id, emp_id, from_date, to_date, company_code):
    return progress_reports(branch_id, dept_id, manager_id, emp_id, from_date, to_date, company_code)

@app.route("/lms_get_course_resources/<int:section_id>/<string:company_code>", methods=['GET'])
@token_required 
def get_resource(section_id, company_code):
    return  get_course_resources(section_id, company_code)

@app.route("/lms_get_dashboard/<int:user_id>/<string:company_code>", methods=['GET'])
@token_required
def get_dashboard(user_id, company_code):
    dashboard = get_user_dashboard(user_id, company_code)
    return dashboard

@app.route("/department_wise_recommendations/<string:manager_id>/<string:company_code>", methods=['GET'])
@token_required
def dept_recommendations(manager_id, company_code):
     return manager_recommendations(manager_id, company_code)

@app.route("/manager_dashboard_pie/<string:branch_id>/<string:manager_id>/<string:department_id>/<string:employee_id>/<string:start_date>/<string:end_date>/<string:company_code>", methods=['GET'])
@token_required
def get_mstats_pie(branch_id, manager_id, department_id, employee_id, start_date, end_date, company_code):
    return manager_stats_pie(branch_id, manager_id, department_id, employee_id, start_date, end_date, company_code)

@app.route("/emp_dashboard_overview/<string:branch_id>/<string:manager_id>/<string:department_id>/<string:employee_id>/<string:start_date>/<string:end_date>/<string:company_code>", methods=['GET'])
@token_required
def emp_dashboard_overview(branch_id, manager_id, department_id, employee_id, start_date, end_date, company_code):
    return mgremp_dashboard(branch_id, manager_id, department_id, employee_id, start_date, end_date, company_code)

@app.route("/manager_dashboard_line/<string:employee_id>/<int:time_filter_id>/<string:manager_id>/<string:department_id>/<string:branch_id>/<string:company_code>", methods=['GET'])
@token_required
def get_mstats_line(employee_id, time_filter_id, manager_id, department_id, branch_id, company_code):
    return manager_stats_line(employee_id, time_filter_id, manager_id, department_id, branch_id, company_code)

@app.route("/manager_dashboard_badges/<string:user_id>/<string:manager_id>/<string:department_id>/<string:branch_id>/<string:from_date>/<string:to_date>/<string:company_code>", methods=['GET'])
@token_required
def get_mstats_badges(user_id, manager_id, department_id, branch_id, from_date, to_date, company_code):
    return get_badge_stats_by_category(user_id, manager_id, department_id, branch_id, from_date, to_date, company_code)

@app.route("/user_daily_progress/<int:user_id>/<int:filter_id>/<string:company_code>", methods=['GET'])
@token_required
def get_user_progress(user_id, filter_id, company_code):
    return sections_progress(user_id, filter_id, company_code)

@app.route("/users_progress/<int:user_id>/<string:company_code>", methods=['GET'])
@token_required
def get_users_progress(user_id, company_code):
    return users_progress(user_id, company_code)

@app.route("/lms_get_enrolled/<int:user_id>/<string:company_code>", methods=['GET'])
@token_required
def get_enrolled(user_id, company_code):
    return  get_user_enrolled(user_id, company_code)

@app.route("/lms_get_assigned/<int:user_id>/<string:company_code>", methods=['GET'])
@token_required
def get_assigned(user_id, company_code):
    return  get_user_assigned(user_id, company_code)

@app.route("/lms_get_reccomended/<int:user_id>/<string:company_code>", methods=['GET'])
@token_required
def get_reccomend(user_id, company_code):
    return  get_user_reccomended(user_id, company_code)

@app.route("/lms_get_trending/<int:user_id>/<string:company_code>", methods=['GET'])
@token_required
def get_trending(user_id, company_code):
    return  get_user_trending(user_id, company_code)

@app.route("/lms_get_user_points/<int:user_id>/<string:company_code>", methods=['GET'])
@token_required
def get_user_points(user_id, company_code):
    return  get_userpoints(user_id, company_code)

@app.route('/lms_get_deptmanagers/<dept_ids>/<branch_id>/<string:company_code>', methods=['GET'])
@token_required
def get_deptm(dept_ids, branch_id, company_code):
    return get_deptmanagers(dept_ids, branch_id, company_code)

@app.route('/lms_get_mgr_employees/<manager_ids>/<course_id>/<string:company_code>', methods=['GET'])
@token_required
def get_employees_by_managers(manager_ids, course_id, company_code):
    return fetch_employees_by_managers(manager_ids, course_id, company_code)

@app.route("/lms_get_popular_courses/<int:user_id>/<string:company_code>", methods=['GET'])
@token_required
def get_popular(user_id, company_code):
    return  get_user_popular(user_id, company_code)

@app.route("/employee_dashboard/<int:user_id>/<string:company_code>", methods=['GET'])
@token_required
def employee_dashboards(user_id, company_code):
    return get_employee_dashboard(user_id, company_code)

@app.route("/lms_employee_getbadges/<int:user_id>/<string:company_code>", methods=['GET'])
@token_required
def get_employee_badges(user_id, company_code):
    return get_userbadges(user_id, company_code)

@app.route("/lms_get_locationmaster/<string:company_code>", methods = ['GET'])
@token_required
def get_location_master(company_code):
    return location_master(company_code)

@app.route("/leaderboard_position/<string:department_id>/<string:manager_id>/<string:branch_id>/<string:company_code>", methods=['GET'])
@token_required
def leader_board_position(department_id, manager_id, branch_id, company_code):
    return get_employee_leaderboard(department_id, manager_id, branch_id, company_code)

@app.route("/manager_dashboard/<int:manager_id>", methods=['GET'])
@token_required
def manager_dashboards(manager_id):
    return get_manager_dashboard(manager_id)

@app.route("/lms_get_modules/<int:module_id>/<int:course_id>/<string:company_code>", methods=['GET'])
@token_required
def get_module(module_id, course_id, company_code):
    modules = get_modules(module_id, course_id, company_code)
    return modules

@app.route("/lms_section_summary/<int:section_id>/<string:company_code>", methods=['GET'])
@token_required
def get_summary(section_id, company_code):
    summary = section_summary(section_id, company_code)
    return summary

@app.route("/lms_superadmin_dashboard/<string:branch_id>/<string:department_id>/<string:from_date>/<string:to_date>/<string:company_code>", methods=['GET'])
@token_required
def super_admin_dashboard(branch_id, department_id, from_date, to_date, company_code):
    return superadmin_dashboard(branch_id, department_id, from_date, to_date, company_code)

@app.route("/lms_get_section/<int:user_id>/<int:section_id>/<int:module_id>/<int:role_id>/<string:company_code>", methods=['GET'])
@token_required
def get_section(user_id, section_id, module_id, role_id, company_code):
    sections_response = get_sections(user_id, section_id, module_id, role_id, company_code)
    if isinstance(sections_response, tuple):
        sections_response, status_code = sections_response
        return sections_response, status_code  

    return sections_response 
        
@app.route('/process_lms_video', methods=['POST'])
def video_process():
    questions = process_video()
    return questions

@app.route('/video_compression', methods=['POST'])
def video():
    quality = reduce_quality()
    return quality
    
@app.route('/generate_lms_thumbnail', methods=['POST'])
@token_required
def create_thumbnail():
    thumbnail = generate_thumbnail()
    return thumbnail

@app.route('/generate_course_content', methods=['POST'])
@token_required
def course_content():
    return title_content()  

@app.route('/generate_module_content', methods=['POST'])
@token_required
def module_content():
    return modules_content()

@app.route('/generate_section_content', methods=['POST'])
@token_required
def section_content():
    return sections_content_generation()

@app.route('/generate_section_notes', methods=['POST'])
@token_required
def section_notes():
    return sections_content()

@app.route('/lms_recommendations', methods=['POST'])
@token_required
def recommendation():
    reco =  recommendations()
    return reco

@app.route("/lms_employee_certificate/<int:user_id>/<int:course_id>/<string:company_code>", methods=['GET'])
@token_required
def employee_certificate(user_id, course_id, company_code):
    return  get_certificate(user_id, course_id, company_code)
 
@app.route('/lms_save_avatars', methods=['POST'])
@token_required
def lms_save_avatar():
    lmsavatar =  store_avatar_badge_images()
    return lmsavatar
    
@app.route("/send-emails", methods=["POST"])  
@token_required
def email_sending():
    return process_and_send_emails()

@app.route("/remainder_mail", methods=["post"]) #sending reminder mails for incomplete courses of employees
@token_required
def send_reminders():
    return send_mail_reminders()

@app.route("/trigger_remainder_cron", methods=["POST"]) #manually trigger remainder mail cron job
@token_required
def trigger_remainder_cron():
    try:
        from cron_jobs import get_companies_with_config, run_job_if_due
        from api_functions import send_mail_reminders
        
        data = request.get_json() if request.get_json() else {}
        company_code = data.get("company_code")
        
        if company_code:
            print(f"Testing reminder job for {company_code}")
            run_job_if_due(company_code, 'reminder', 0.001, send_mail_reminders)
            return jsonify({"message": f"Remainder mail cron job executed for {company_code}"}), 200
        else:
            companies_config = get_companies_with_config()
            results = []
            
            for config in companies_config:
                company = config['company']
                if 'reminder' in config:
                    print(f"Testing reminder job for {company}")
                    run_job_if_due(company, 'reminder', 0.001, send_mail_reminders)
                    results.append(f"Processed {company}")
            
            return jsonify({
                "message": "Remainder mail cron jobs executed",
                "results": results
            }), 200
            
    except Exception as e:
        return jsonify({"error": f"Failed to execute cron job: {str(e)}"}), 500

@app.route("/due_mail_managers", methods=["POST"]) #sending due mails to managers
@token_required
def send_duemail():
    return due_mail_manager()

@app.route("/escalation_mails", methods=["POST"]) #sending escalation mails to employees for mandatory courses
@token_required
def escalation():
    return escalation_mail()

@app.route("/search_employees", methods=['GET'])
@token_required
def search_employees_route():
    return search_employees()

@app.route("/employee_completed_courses/<int:user_id>/<string:company_code>", methods=['GET'])
@token_required
def my_completed_courses_route(user_id, company_code):
    return get_my_completed_courses(user_id, company_code)


@app.route('/lms_get_all_employees/<string:company_code>', methods=['GET'])
@token_required
def get_employees(company_code):
    return fetch_all_employees(company_code)

@app.route('/lms_assign_reviewers', methods=['POST'])
@token_required
def lms_assign_reviewers():
    return assign_reviewers()

@app.route("/lms_get_pending_reviews/<int:user_id>/<string:company_code>", methods=['GET'])
@token_required
def get_pending_reviews_route(user_id, company_code):
    return get_pending_reviews(user_id, company_code)

@app.route("/lms_get_courses_by_questions/<int:course_id>/<string:company_code>", methods=['GET'])
@token_required
def get_course_by_questions_route(course_id, company_code):
    return  get_course_by_questions(course_id, company_code)


@app.route("/lms_store_user_choice", methods=['POST'])
@token_required
def store_user_choice():
    return lms_store_user_choice()

@app.route("/lms_update_review_status", methods=['POST'])
@token_required
def update_review_status():
    return lms_update_review_status()

@app.route("/lms_get_reviewer_history/<int:user_id>/<string:company_code>", methods=['GET'])
@token_required
def get_reviewer_history_route(user_id, company_code):
    return  get_reviewer_history(user_id, company_code)

@app.route('/lms_add_version_details', methods=['POST'])
@token_required
def add_version_details():
    verison = lms_add_version_details()
    return verison
 
@app.route("/lms_get_reviewers/<string:company_code>/<int:emp_id>", methods=["GET"])
@token_required
def get_reviewers(company_code,emp_id):
    return get_lms_reviewers(company_code,emp_id)
 
@app.route("/lms_get_approvers/<string:company_code>/<int:emp_id>", methods=["GET"])
@token_required
def get_approvers(company_code,emp_id):
    return get_lms_approvers(company_code,emp_id)

@app.route("/lms_get_checklist_courses_instructor/<int:user_id>/<string:company_code>", methods=["GET"])
@token_required
def get_checklist_courses_instructor( user_id,company_code):
    return get_lms_checklist_courses_instructor(user_id, company_code)

@app.route("/lms_get_checklist_courses_reviewer/<int:user_id>/<string:company_code>", methods=["GET"])
@token_required
def get_checklist_courses_reviewer(user_id, company_code):
    return get_lms_checklist_courses_reviewer(user_id, company_code)

@app.route("/lms_get_checklist_courses_approver/<int:user_id>/<string:company_code>", methods=["GET"])
@token_required
def get_checklist_courses_approver(user_id, company_code):
    return get_lms_checklist_courses_approver(user_id, company_code)

@app.route("/lms_get_course_details/<int:course_id>/<string:company_code>", methods=["GET"])
@token_required
def get_lms_course_details( course_id,company_code):
    return get_course_details(course_id,company_code)

@app.route("/lms_get_course_content/<int:course_id>/<string:company_code>", methods=["GET"])
@token_required
def get_lms_course_content( course_id,company_code):
    return get_course_content(course_id,company_code)

@app.route("/lms_get_selected_review_approval/<int:course_id>/<string:company_code>", methods=["GET"])
@token_required
def get_selected_review_approval_route(course_id, company_code):
    return get_selected_review_approval(course_id, company_code)

@app.route('/lms_delete_modules', methods=['POST'])
@token_required
def lms_delete_modules():
    return delete_modules()

@app.route('/lms_delete_sections', methods=['POST'])
@token_required
def lms_delete_sections():
    return delete_sections()

@app.route('/lms_delete_resources', methods=['POST'])
@token_required
def lms_delete_resources():
    return delete_resources()

@app.route('/lms_instructor_submit', methods=['POST'])
@token_required
def lms_instructor_submit():
    return lms_instructor_submit_course()



@app.route('/lms_get_course_report_details/<int:urn>/<string:company_code>', methods=['GET'])
@token_required
def get_course_report_details(urn, company_code):
    return lms_get_course_details(urn, company_code)

@app.route("/lms_get_coursenames/<string:company_code>", methods=["GET"])
@token_required
def get_coursenames(company_code):
    return  lms_get_course_names(company_code)

@app.route("/lms_get_manager_summary_report_courses_filter", methods=["POST"])
@token_required
def get_manager_summary_report_courses_filter(): 
    return  lms_get_manager_summary_report_courses_filter()

@app.route('/lms_get_manager_summary_reports', methods=['GET'])
@token_required
def get_manager_summary_reports():
    return lms_get_manager_summary_reports()

@app.route("/lms_get_instructor_summary_report_courses_filter", methods=["POST"])
@token_required
def get_instructor_summary_report_courses_filter(): 
    return  lms_get_instructor_summary_report_courses_filter()

@app.route('/lms_get_instructor_summary_reports', methods=['POST'])
@token_required
def get_instructor_summary_reports():
    return lms_get_instructor_summary_reports()

@app.route('/lms_get_summary_report_hr_instructors_filter', methods=['POST'])
@token_required
def get_hr_summary_report_instructors_filter():
    return lms_get_hr_summary_report_instructors_filter()

@app.route('/lms_get_hr_summary_report_courses_filter', methods=['POST'])
@token_required
def get_hr_summary_report_courses_filter():
    return lms_get_hr_summary_report_courses_filter()

@app.route('/lms_get_hr_summary_reports', methods=['POST'])
@token_required
def get_hr_summary_reports():
    return lms_get_hr_summary_reports()

@app.route("/microsoft_login", methods=["POST", "OPTIONS"])
@cross_origin(origins=[
    "http://localhost:4200",
    "http://127.0.0.1:4200",
    "https://sprybot.spryple.com",
    "http://13.201.158.74:4200"
], methods=["POST", "OPTIONS"], allow_headers=["Content-Type", "Authorization"])
def microsoft_login_route():
    if request.method == "OPTIONS":
        return "", 200  
    return microsoft_sso_login()

@app.route("/lms_bulk_add_sections", methods=['POST'])
@token_required
def bulk_add_sections():
    return lms_bulk_add_sections()

@app.route('/submit_course', methods=['POST'])
def submit_lms_course():
    return submit_course()

@app.route('/lms_get_all_levels/<string:company_code>', methods=['GET']) 
@token_required
def get_all_levels(company_code):
    return lms_get_all_levels(company_code)

@app.route('/lms_get_reviewers_approvers', methods=['POST'])
@token_required
def get_reviewers_approvers():
    return lms_get_reviewers_approvers()

@app.route('/lms_reviewer_reject_course', methods=['POST'])
@token_required
def reject_course():
    return lms_reviewer_reject_course()

@app.route('/lms_reviewer_approve_course', methods=['POST'])
@token_required
def approve_course():
    return lms_reviewer_approve_course()

if __name__ == '__main__':
    
    start_cron_jobs()
    
    app.run(debug=True, host = "0.0.0.0", port=8088)



