from flask import Flask, render_template, request
import psycopg2
import sqlite3

app = Flask(__name__)

def get_db_connection(postgres=True, sqllite=False):
    try:
        if postgres:
            conn = psycopg2.connect(
                host="localhost",
                database="dotplot_data",
                user="postgres",
                password="xxxx"
            )
            return conn
        if sqllite:
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
    scan_id = request.form.get('scan_id')
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        if request.method == 'GET':
            cur.execute('SELECT * FROM patients_table JOIN us_scan_table ON patients_table.us_scan_id = us_scan_table.us_scan_id')
        else:
            if first_name_query:
                cur.execute('SELECT * FROM patients_table JOIN us_scan_table ON patients_table.us_scan_id = us_scan_table.us_scan_id WHERE "First Name" ILIKE %s', 
                            (f'%{first_name_query}%',))
            elif last_name_query:
                cur.execute('SELECT * FROM patients_table JOIN us_scan_table ON patients_table.us_scan_id = us_scan_table.us_scan_id WHERE "Last Name" ILIKE %s', 
                            (f'%{last_name_query}%',))
            if scan_id:
                cur.execute('SELECT * FROM patients_table JOIN us_scan_table ON patients_table.us_scan_id = us_scan_table.us_scan_id WHERE patients_table.us_scan_id = CAST(%s AS BIGINT)',
                            (f'{scan_id}',))
        
        rows = cur.fetchall()
        print(f"Rows fetched from database: {rows}")
    except Exception as e:
        print(f"Error executing query: {e}")
        rows = []
    cursor.close()
    conn.close()
    return render_template('index.html', rows=rows, first_name_query=first_name_query, last_name_query=last_name_query)

if __name__ == '__main__':
    app.run(debug=True)
