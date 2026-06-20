
import pymysql
from pymysql.err import OperationalError, InterfaceError

#preprod
# DB_HOST = "43.205.12.16"
# DB_PORT = 3307

#QA
DB_HOST = "13.201.158.74"
DB_PORT = 3306

#production
# DB_HOST = "172.19.2.199"
# DB_PORT = 3306

DB_USER = "root"
DB_PASSWORD = "Sreebaw$1103"



def get_variants(database_name):
    base = database_name
    suffix = base[:3]  
    return [base, f"{base}_{suffix}"]


def database_exists(db_name):
    connection = None
    try:
        
        connection = pymysql.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            autocommit=True,
            cursorclass=pymysql.cursors.DictCursor
        )
        with connection.cursor() as cursor:
            cursor.execute("SHOW DATABASES LIKE %s", (db_name,))
            result = cursor.fetchone()
            exists = result is not None
            
            return exists
    except (OperationalError, InterfaceError) as e:
        
        return False
    finally:
        if connection:
            connection.close()


def get_connection(database=None, max_retries=2):
    if not database:
        raise ValueError("Database name or company code must be provided.")

    db_names_to_try = get_variants(database)
    

    for db_name in db_names_to_try:
        
        if database_exists(db_name):
            for attempt in range(max_retries):
                try:
                    
                    connection = pymysql.connect(
                        host=DB_HOST,
                        port=DB_PORT,
                        user=DB_USER,
                        password=DB_PASSWORD,
                        database=db_name,
                        autocommit=False,  # Changed to False for better transaction control
                        cursorclass=pymysql.cursors.DictCursor,
                        connect_timeout=60,  # Increased to 60 seconds
                        read_timeout=600,    # 10 minutes read timeout
                        write_timeout=600    # 10 minutes write timeout
                    )
                    connection.ping(reconnect=True)
                    
                    return connection
                except (OperationalError, InterfaceError) as e:
                    
                    if attempt == max_retries - 1:
                        raise

    raise Exception(f"Database not found for name: {database}")


def get_server_connection():
    """Get connection to MySQL server without specifying database"""
    try:
        connection = pymysql.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            autocommit=True,
            cursorclass=pymysql.cursors.DictCursor
        )
        return connection
    except (OperationalError, InterfaceError) as e:
        raise Exception(f"Failed to connect to MySQL server: {e}")


# import pymysql
# from pymysql.err import OperationalError, InterfaceError

# # -------------------
# # ENVIRONMENT CONFIGS
# # -------------------
# ENVIRONMENTS = {
#     "qa": {"host": "13.126.254.80", "port": 3306},
#     "preprod": {"host": "43.205.12.16", "port": 3307},
#     "prod": {"host": "172.19.2.199", "port": 3306},
# }

# DB_USER = "root"
# DB_PASSWORD = "Sreebaw$1103"

# # set current environment (just like selected_con in JS)
# CURRENT_ENV = "qa"   # change to "prod" or "preprod" when needed


# def get_base_connection():
#     """Return a connection to the base DB (no schema selected)."""
#     env = ENVIRONMENTS[CURRENT_ENV]
#     return pymysql.connect(
#         host=env["host"],
#         port=env["port"],
#         user=DB_USER,
#         password=DB_PASSWORD,
#         autocommit=True,
#         cursorclass=pymysql.cursors.DictCursor
#     )


# def resolve_database(company_code: str) -> str:
#     """
#     Call stored procedure (or central table) to resolve which DB/schema
#     belongs to the given company_code.
#     """
#     connection = get_base_connection()
#     try:
#         with connection.cursor() as cursor:
#             # same as: CALL get_company_db_name(company_code)
#             cursor.execute("CALL get_company_db_name(%s)", (company_code,))
#             result = cursor.fetchone()
#             if not result or "db_name" not in result:
#                 raise Exception(f"No database found for company {company_code}")
#             return result["db_name"]
#     finally:
#         connection.close()


# def get_connection(company_code: str, max_retries: int = 2):
#     """
#     Returns a connection for the given company code.
#     - Finds correct schema name from central DB/SP
#     - Connects to that schema
#     """
#     db_name = resolve_database(company_code)
#     env = ENVIRONMENTS[CURRENT_ENV]

#     for attempt in range(max_retries):
#         try:
#             conn = pymysql.connect(
#                 host=env["host"],
#                 port=env["port"],
#                 user=DB_USER,
#                 password=DB_PASSWORD,
#                 database=db_name,
#                 autocommit=True,
#                 cursorclass=pymysql.cursors.DictCursor
#             )
#             conn.ping(reconnect=True)
#             return conn
#         except (OperationalError, InterfaceError) as e:
#             if attempt == max_retries - 1:
#                 raise

#     raise Exception(f"Could not connect to DB for company {company_code}")
