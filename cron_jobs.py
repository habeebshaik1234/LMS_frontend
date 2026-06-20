import time
import threading
import schedule
import os
import builtins
from datetime import datetime, timedelta
from dotenv import load_dotenv
load_dotenv()
from api_functions import send_mail_reminders, due_mail_manager, escalation_mail
from config import get_connection, get_server_connection
import pymysql
import api_functions

# Read SMTP config after loading environment variables
smtp_host = os.getenv("SMTP_HOST")
smtp_user = os.getenv("SMTP_USER")
smtp_pass = os.getenv("SMTP_PASS")

scheduler_thread = None
running = False

def get_companies():
    try:
        connection = get_server_connection()
        
        cursor = connection.cursor()
        cursor.execute("""
            SELECT DISTINCT SCHEMA_NAME as company_code
            FROM information_schema.SCHEMATA
            WHERE SCHEMA_NAME NOT IN ('information_schema', 'mysql', 'performance_schema', 'sys')
        """)
        companies = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return [c['company_code'] for c in companies]

    except Exception as e:
        print(f"get_companies failed: {e}")
        print("Network issue detected - cron jobs will retry later")
        return []


def get_companies_with_config():
    companies = get_companies()
    companies_with_config = []
    
    for company in companies:
        try:
            connection = get_connection(database=company)
            cursor = connection.cursor(pymysql.cursors.DictCursor)
            
            cursor.execute("SHOW TABLES LIKE 'lms_scoring_config'")
            if not cursor.fetchone():
                cursor.close()
                connection.close()
                continue
            
            cursor.execute("""
                SELECT attribute_name, attribute_value 
                FROM lms_scoring_config 
                WHERE attribute_name IN ('Reminder email interval', 'Manager due interval', 'Escalation interval')
            """)
            config = cursor.fetchall()
            
            if config: 
                company_config = {'company': company}
                for item in config:                    
                    if item['attribute_name'] == 'Reminder email interval':
                        company_config['Reminder'] = float(item['attribute_value'])
                    elif item['attribute_name'] == 'Manager due interval':
                        company_config['Manager'] = float(item['attribute_value'])
                    elif item['attribute_name'] == 'Escalation interval':
                        company_config['Escalation'] = float(item['attribute_value'])
                
                companies_with_config.append(company_config)
                print(f"{company}: reminder={company_config.get('Reminder', 'N/A')}, manager={company_config.get('Manager', 'N/A')}, escalation={company_config.get('Escalation', 'N/A')}")

            
            cursor.close()
            connection.close()
            
        except Exception as e:
            print(f"Error reading config for {company}: {e}")
            continue
    
    return companies_with_config


def track_server_downtime():
    try:
        connection = get_server_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        
        cursor.execute("USE information_schema")
        
        
        cursor.close()
        connection.close()
        
    except Exception as e:
        print(f"Error tracking server downtime: {e}")

def should_run_job(company, job_type, interval_days):
    try:
        connection = get_connection(database=company)
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS lms_cron_tracking (
                id INT AUTO_INCREMENT PRIMARY KEY,
                company_code VARCHAR(100),
                job_type VARCHAR(50),
                last_run DATETIME,
                UNIQUE KEY unique_job (company_code, job_type)
            )
        """)
        
        cursor.execute("""
            SELECT last_run
            FROM lms_cron_tracking 
            WHERE company_code = %s AND job_type = %s
        """, (company, job_type))
        
        result = cursor.fetchone()
        cursor.close()
        connection.close()
        
        if not result or not result['last_run']:
            print(f"🆕 {company}/{job_type}: First run")
            return True
        
        last_run = result['last_run']
        time_since_last_run = (datetime.now() - last_run).total_seconds()
        required_seconds = interval_days * 24 * 60 * 60
        
        return time_since_last_run >= required_seconds
        
    except Exception as e:
        print(f"Error checking job due for {company}: {e}")
        return True

def update_last_run(company, job_type):
    try:
        connection = get_connection(database=company)
        cursor = connection.cursor()
        
        cursor.execute("""
            INSERT INTO lms_cron_tracking (company_code, job_type, last_run)
            VALUES (%s, %s, NOW())
            ON DUPLICATE KEY UPDATE last_run = NOW()
        """, (company, job_type))
        
        connection.commit()
        cursor.close()
        connection.close()
        
        
    except Exception as e:
        print(f"Error updating last run for {company}: {e}")

def run_job_if_due(company, job_type, interval_days, job_func):
    if should_run_job(company, job_type, interval_days):
        start_ts = datetime.utcnow().isoformat()
        print(f"[cron run START] {start_ts} - company={company}, job_type={job_type}")
        try:
            # Re-read SMTP settings in case they were changed or not present at import time
            smtp_host = os.getenv("SMTP_HOST")
            smtp_user = os.getenv("SMTP_USER")
            smtp_pass = os.getenv("SMTP_PASS")

            masked_pass = '***' if smtp_pass else None
            print(f"[cron run] SMTP host set: {bool(smtp_host)}, user set: {bool(smtp_user)}, pass set: {bool(smtp_pass)}")

            if not smtp_host or not smtp_user or not smtp_pass:
                print(f"SMTP config missing for {company} - skipping {job_type}")
                return

            try:
                email_count = 0

                # Avoid modifying module or builtins state. Call jobs with explicit company_code to prevent side effects.
                if job_type == 'Reminder':
                    conn = get_connection(database=company)
                    cur = conn.cursor(pymysql.cursors.DictCursor)
                    cur.callproc("lms_get_mail_reminders")
                    reminders = cur.fetchall()

                    email_count = sum(1 for r in reminders if r.get('officeemail') and '@' in r.get('officeemail', ''))

                    if reminders:
                        print(f" First 3 reminders for {company}:")
                        for i, r in enumerate(reminders[:3]):
                            print(f"   {i+1}. {r.get('employee_name', 'N/A')} ({r.get('officeemail', 'N/A')})")

                    cur.close()
                    conn.close()

                    print(f"[cron run] reminder email_count={email_count}")
                    if email_count > 0:
                        try:
                            result = send_mail_reminders(company_code=company)
                            print(f"[cron run] send_mail_reminders result: {result}")
                            update_last_run(company, job_type)
                        except Exception as job_e:
                            print(f"send_mail_reminders failed for {company}: {job_e}")
                    else:
                        print(f"[cron run] No reminders to send for {company}")
                        return

                elif job_type == 'Manager':
                    conn = get_connection(database=company)
                    cur = conn.cursor(pymysql.cursors.DictCursor)
                    cur.callproc("lms_get_due_mail_managers")
                    managers = cur.fetchall()
                    email_count = len(managers)
                    cur.close()
                    conn.close()

                    print(f"[cron run] manager email_count={email_count}")
                    if email_count > 0:
                        try:
                            result = due_mail_manager(company_code=company)
                            print(f"[cron run] due_mail_manager result: {result}")
                            update_last_run(company, job_type)
                        except Exception as job_e:
                            print(f"due_mail_manager failed for {company}: {job_e}")
                    else:
                        print(f"{company}: No manager notifications, skipping")
                        return

                elif job_type == 'Escalation':
                    conn = get_connection(database=company)
                    cur = conn.cursor(pymysql.cursors.DictCursor)
                    cur.callproc("lms_get_escalation_users")
                    escalations = cur.fetchall()
                    email_count = len(escalations)  # ← count the rows
                    cur.close()                     # ← close cursor
                    conn.close()                    # ← close connection

                    print(f"[cron run] escalation email_count={email_count}")
                    
                    if escalations:
                        print(f" First 3 escalations for {company}:")
                        for i, r in enumerate(escalations[:3]):
                            print(f"   {i+1}. {r.get('employee_name', 'N/A')} ({r.get('employee_email', 'N/A')})")

                    if email_count > 0:
                        try:
                            result = escalation_mail(company_code=company)
                            print(f"[cron run] escalation result: {result}")
                            update_last_run(company, job_type)
                        except Exception as job_e:
                            print(f"escalation_mail failed for {company}: {job_e}")
                    else:
                        print(f"{company}: No escalation users, skipping")
                        return  # ← skip update_last_run like Reminder and Manager do

            except Exception as e:
                import traceback
                traceback.print_exc()
                print(f"Error during job execution for {company}/{job_type}: {e}")


        except Exception as e:
            import traceback
            traceback.print_exc()
            print(f"Error running {job_type} for {company}: {e}")
        finally:
            end_ts = datetime.utcnow().isoformat()
            print(f"[cron run END] {end_ts} - company={company}, job_type={job_type}")

def schedule_jobs():
    companies_config = get_companies_with_config()
    
    if not companies_config:
        schedule.clear()
        
        def check_all_jobs():
            retry_companies = get_companies_with_config()
            if retry_companies:
                for config in retry_companies:
                    company = config['company']
                    
                    if 'Reminder' in config:
                        run_job_if_due(company, 'Reminder', config['Reminder'], send_mail_reminders)
                    
                    if 'Manager' in config:
                        run_job_if_due(company, 'Manager', config['Manager'], due_mail_manager)
                    
                    if 'Escalation' in config:
                        run_job_if_due(company, 'Escalation', config['Escalation'], escalation_mail)
            else:
                print("Still no database connection - will retry next hour")
        
        schedule.every(5).minutes.do(check_all_jobs)
        return
    
    schedule.clear()
    
    def check_all_jobs():
        for config in companies_config:
            company = config['company']
            
            if 'Reminder' in config:
                run_job_if_due(company, 'Reminder', config['Reminder'], send_mail_reminders)
            
            if 'Manager' in config:
                run_job_if_due(company, 'Manager', config['Manager'], due_mail_manager)
            
            if 'Escalation' in config:
                run_job_if_due(company, 'Escalation', config['Escalation'], escalation_mail)
    
    schedule.every(5).minutes.do(check_all_jobs)

def start_scheduler():

    global scheduler_thread, running
    if running:
        return
    
    def run():
        global running
        running = True
        
        while running:
            schedule.run_pending()
            time.sleep(60)  
    
    scheduler_thread = threading.Thread(target=run, daemon=True)
    scheduler_thread.start()
    
    for job in schedule.jobs:
        print(f"Job: {job.job_func} - Next run: {job.next_run}")

def stop_scheduler():

    global running
    running = False
    print("Cron scheduler stopped")

def start_cron_jobs():
    track_server_downtime()
    schedule_jobs()
    start_scheduler()

def stop_cron_jobs():
    stop_scheduler()