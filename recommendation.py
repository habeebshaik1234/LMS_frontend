from flask import jsonify, request
import pymysql
from langchain_groq import ChatGroq
from langchain.chains.llm import LLMChain
from langchain.prompts import PromptTemplate
import os
import html
from config import get_connection

SECRET_KEY = os.getenv("SECRET_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL")

llm = ChatGroq(api_key=GROQ_API_KEY, model=LLM_MODEL, temperature=0.5)


def recommendations():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        if not user_id:
            return jsonify({"response": "Missing user_id parameter."})

        company_code = data.get("company_code")
        if not company_code:
            return jsonify({"response": "company_code is required"})

        connection = get_connection(database=company_code)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        cursor.execute("SELECT course_name FROM lms_course")
        all_courses = [row["course_name"] for row in cursor.fetchall()]

        cursor.execute("""
            SELECT 
                u.id AS user_id,
                u.firstname AS user_name,
                dm.deptname AS role,
                p.completion_percentage,
                p.last_accessed,
                p.total_acquired_points,
                p.average_test_score AS user_score,
                c.course_name,
                c.category,
                c.difficulty_level AS course_difficulty,
                c.prerequisites,
                GROUP_CONCAT(DISTINCT m.module_name) AS completed_modules,
                GROUP_CONCAT(DISTINCT p.attempt_number) AS attempts,
                GROUP_CONCAT(DISTINCT pt.acquired_points) AS module_scores,
                GROUP_CONCAT(DISTINCT pt.is_passed) AS module_pass_status,
                GROUP_CONCAT(DISTINCT c.tags) AS course_tags
            FROM employee u
            LEFT JOIN employee_departments ed ON u.id = ed.empid
            LEFT JOIN departmentsmaster dm ON ed.departmentid = dm.id
            LEFT JOIN lms_progress p ON u.id = p.user_id
            LEFT JOIN lms_enrollments e ON u.id = e.user_id
            LEFT JOIN lms_course c ON e.course_id = c.id
            LEFT JOIN lms_modules m ON c.id = m.course_id
            LEFT JOIN lms_points_details pt ON u.id = pt.user_id
            WHERE u.id = %s
            GROUP BY 
                u.id, u.firstname, dm.deptname, p.completion_percentage, 
                p.last_accessed, p.total_acquired_points, p.average_test_score, 
                c.id, c.course_name, c.category, c.difficulty_level, c.prerequisites;
        """, (user_id,))
        user_data = cursor.fetchall()

        if not user_data:
            return jsonify({"response": "No data found for the provided user_id."})

        first_record = user_data[0]
        user_details = {
            "id": first_record["user_id"],
            "name": first_record["user_name"],
            "role": first_record["role"],
            "completion_percentage": first_record["completion_percentage"],
            "last_accessed": first_record["last_accessed"],
            "total_acquired_points": first_record["total_acquired_points"],
            "user_score": first_record["user_score"],
            "current_course": first_record["course_name"],
            "course_category": first_record["category"],
            "course_difficulty": first_record["course_difficulty"],
            "prerequisites": first_record["prerequisites"],
            "completed_modules": first_record["completed_modules"],
            "attempts": first_record["attempts"],
            "course_tags": first_record["course_tags"],
        }

        ai_prompt = f"""
        You are an AI Learning Advisor analyzing a learner's progress. Based on the provided data, generate clear, concise, and actionable insights for each section below.

        Learner Profile:
        - Name: {user_details['name']}
        - Role: {user_details['role']}
        - Current Course: {user_details['current_course']} ({user_details['course_category']})
        - Difficulty Level: {user_details['course_difficulty']}
        - Completion: {user_details['completion_percentage']}%
        - Total Points: {user_details['total_acquired_points']}
        - Score: {user_details['user_score']}
        - Last Accessed: {user_details['last_accessed']}
        - Completed Modules: {user_details['completed_modules']}
        - Attempts: {user_details['attempts']}
        - Prerequisites: {user_details['prerequisites']}
        - Tags: {user_details['course_tags']}

        Available Courses: {', '.join(all_courses)}

        Generate **plain text** responses (no HTML, no markdown formatting) for the following sections:

        1. Weak Areas – Identify specific topics or skills the learner needs to improve based on their progress and performance.
        2. Action Plan – Suggest short, practical steps the learner can take to improve their weak areas and boost performance.
        3. Suggested Courses – Recommend 2–3 relevant courses from the available list that match the learner’s current needs, difficulty level, and interests.
        4. External Resources – Recommend helpful learning materials (e.g., YouTube channels, articles, or documentation) to strengthen understanding of weak areas.

        Keep all responses concise, focused, and actionable.
        """

        llm_prompt = PromptTemplate(
            input_variables=["prompt"],
            template="""
            You are an AI Learning Advisor.
            {prompt}
            """
        )

        chain = llm_prompt | llm
        result = chain.invoke({"prompt": ai_prompt})
        raw_content = result.content.strip() if hasattr(result, "content") else result.get("text", "").strip()


        section_titles = ["Weak Areas", "Action Plan", "Suggested Courses", "External Resources"]
        sections_content = {}

        for i, title in enumerate(section_titles):
            try:
                if i < len(section_titles) - 1:
                    end_title = section_titles[i + 1]
                    content = raw_content.split(title)[-1].split(end_title)[0].strip()
                else:
                    content = raw_content.split(title)[-1].strip()
            except Exception:
                content = "N/A"

            lines = content.split("\n")
            unique_lines = []
            for line in lines:
                line = line.strip()
                if line and line not in unique_lines:
                    unique_lines.append(line)
            sections_content[title] = "<br>".join(unique_lines)

        combined_html = f"""
        <div style='font-family:Segoe UI,Arial,sans-serif;line-height:1.5;'>
            <h3>Current Course: {html.escape(user_details['current_course'])}</h3>
        """

        icons = {
            "Weak Areas": "🧠",
            "Action Plan": "📝",
            "Suggested Courses": "📚",
            "External Resources": "🔗"
        }

        for title in section_titles:
            combined_html += f"""
            <div style='margin-top:10px;'>
                <h2 style='color:#ADD8E6; margin:0; padding:0;'>{icons.get(title, '')} {title}</h2>
                <div style='margin:0; padding:0;'>{sections_content[title]}</div>
            </div>
            """

        combined_html += "</div>"

        return jsonify({"insights": combined_html})

    except Exception as e:
        import traceback
        print(traceback.format_exc())
        return jsonify({"response": str(e)})

    finally:
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'connection' in locals() and connection:
            connection.close()
