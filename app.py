from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import psycopg2
import sqlite3

app = Flask(__name__)
CORS(app)
def get_db_connection(postgres=True, sqllite=False):
    """
    this function creates a connection with the desired database to retrieve data  

    Parameters:
    -----------
        postgres: Bool 
            Set to True if PostgreSQL is the desired database (default is True).

        sqllite: Bool
            Set to True if SQLite is the desired database (default is False).

    Returns:
        conn: Connection or None
            A connection object to the specified database, or None if the connection fails.

    NOTE: REPLACE "XXXX" WITH YOUR password ty.
    """

    try:
        if postgres:
            conn = psycopg2.connect(
                host="localhost",
                database="dotplot_data",
                user="postgres",
                password="xxx"
            )
            return conn
        elif sqllite:
            DATABASE = 'dotplot_data.db'
            conn = getattr(g, '_database', None)
            if conn is not None:
                conn = g._database = sqlite3.connect(DATABASE)
            return conn

    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None

@app.route('/', methods=['GET', 'POST'])
def index():
    first_name_query = request.form.get('first_name')
    last_name_query = request.form.get('last_name')
    scan_id = request.form.get('patient_id')
    conn = get_db_connection(postgres=True)
    cur = conn.cursor()
    try:
        if request.method == 'GET':
            cur.execute('SELECT patients_table.*,us_scan_table.coordinates, us_scan_table.scan_date, us_scan_table.diagnosis FROM patients_table JOIN us_scan_table ON patients_table.us_scan_id = us_scan_table.us_scan_id')
        else:
            if first_name_query:
                cur.execute('SELECT patients_table.*,us_scan_table.coordinates, us_scan_table.scan_date, us_scan_table.diagnosis FROM patients_table JOIN us_scan_table ON patients_table.us_scan_id = us_scan_table.us_scan_id WHERE first_name ILIKE %s', 
                            (f'%{first_name_query}%',))
            elif last_name_query:
                cur.execute('SELECT patients_table.*,us_scan_table.coordinates, us_scan_table.scan_date, us_scan_table.diagnosis FROM patients_table JOIN us_scan_table ON patients_table.us_scan_id = us_scan_table.us_scan_id WHERE last_name ILIKE %s', 
                            (f'%{last_name_query}%',))
            if scan_id:
                cur.execute('SELECT patients_table.*,us_scan_table.coordinates, us_scan_table.scan_date, us_scan_table.diagnosis  FROM patients_table JOIN us_scan_table ON patients_table.us_scan_id = us_scan_table.us_scan_id WHERE patient_id = CAST(%s AS BIGINT)',
                            (f'{scan_id}',))
        
        rows = cur.fetchall()
        print(f"Rows fetched from database: {rows}")
    except Exception as e:
        print(f"Error executing query: {e}")
        rows = []
    cur.close()
    conn.close()
    
    return jsonify(rows)

if __name__ == '__main__':
    app.run(debug=True)
