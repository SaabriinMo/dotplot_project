from flask import Flask, render_template
import psycopg2  # for PostgreSQL
# import mysql.connector  # for MySQL

app = Flask(__name__)

def get_db_connection():
    # PostgreSQL connection
    conn = psycopg2.connect(
        host="localhost",
        database="dotplot_data",
        user="postgres",
        password="xxxxxx"
    )

    # mysql conncetion


    return conn


@app.route('/')
def index():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM patients_table;')
    paitents = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('index.html', paitents=paitents)


if __name__ == "__main__":
    #conn = get_db_connection()
    app.run(debug=True)
    