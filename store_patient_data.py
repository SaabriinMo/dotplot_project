from flask import Flask, render_template
import sqlite3

app = Flask(__name__)

DATABASE = 'dotplot_data.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
def search():
    if request.method == 'POST':
        search_term = request.form['search']
        cur = get_db().cursor()
        cur.execute("SELECT * FROM patients WHERE first_name LIKE ? OR last_name LIKE ? OR id LIKE ?", 
                    ('%'+search_term+'%', '%'+search_term+'%', '%'+search_term+'%'))
        results = cur.fetchall()
        return render_template('search.html', results=results)
    return render_template('search.html', results=[])

if __name__ == '__main__':
    app.run(debug=True)
