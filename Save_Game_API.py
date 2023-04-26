import sqlite3
from flask import Flask, render_template, request, url_for, flash, redirect,abort

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Game'

# This is the connection that gets the access to the database to do things with 
def get_db_connection():
    conn = sqlite3.connect('Save_Games.db')
    conn.row_factory = sqlite3.Row
    return conn

# This get the users from the database that has the id that is fed into it 
def get_user(SaveNumber):
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM SaveGame WHERE SaveNumber = ?',
                        (SaveNumber,)).fetchone()
    conn.close()

    return user


# This is the index and such the front page of the app and gets all the users
# from the database and dsiaply the entire thing, with name,id and points
@app.route('/')
def index():
    conn = get_db_connection()
    users = conn.execute('SELECT * FROM users').fetchall()
    conn.close()
    return 0



# This edit the user by using the id and the index way to edit the user name, id and # points
# and isn't in a new page but at the bottom of each user display set 

@app.route('/<int:SaveNumber>/edit/', methods=('GET', 'POST'))
def edit(PlayerName, ID, levelNumber,TimeScore , SaveNumber):
    user = get_user(SaveNumber)
    # After POST get the user name and points change and update the database with no id
    # Can't change the id as need id to edit

    conn = get_db_connection()
    conn.execute('UPDATE SaveGame SET PlayerName = ?, ID = ?,  levelNumber = ? , TimeScore = ?'
                         ' WHERE SaveNumber = ?',
                         (PlayerName, ID, levelNumber,TimeScore , SaveNumber))
    conn.commit()
    conn.close()










