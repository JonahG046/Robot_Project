import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_PW = os.getenv("SECRET_PW")

#print(SECRET_PW)

def connect():
    try:
        params = {
            'host': 'localhost',
            'database': 'robot',
            'user': 'krista',
            'password': SECRET_PW
        }

        connection = psycopg2.connect(**params)

        cursor = connection.cursor()

    #     cursor.execute('SELECT * FROM robot_status')

        #db_version = cursor.fetchone()

    #    my_user = cursor.fetchall()
        
    #    print(my_user)

        cursor.close()

        return connection
    
    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error: {error}")
        return None
    
    if connection is not None:
        connection.close()
        print("Database connection closed.")

if __name__ == "__main__":
    conn = connect()
    if conn:
        conn.close()
        print("Database connection closed.")

