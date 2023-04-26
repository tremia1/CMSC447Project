import sqlite3
# makes the table of users with user_name,id,points and inser the beginner # users 
connection = sqlite3.connect('Save_Games.db')


with open('schema.sql') as f:
    connection.executescript(f.read())


cur = connection.cursor()

cur.execute("INSERT INTO SaveGame (SaveNumber, PlayerName, Id, levelNumber, TimeScore ) VALUES (?, ?,?,?,?)",
            ('1', 'Jack ','0','0','600')
            )

cur.execute("INSERT INTO SaveGame (SaveNumber, PlayerName, Id, levelNumber, TimeScore ) VALUES (?, ?,?,?,?)",
            ('1', 'Bob ','0','0','600')
            )

cur.execute("INSERT INTO SaveGame (SaveNumber, PlayerName, Id, levelNumber, TimeScore ) VALUES (?, ?,?,?,?)",
            ('1', 'Mary','0','0','600')
            )


cur.execute("INSERT INTO SaveGame (SaveNumber,PlayerName , Id, levelNumber, TimeScore ) VALUES (?, ?,?,?,?)",
            ('1', 'Kat ','0','0','600')
            )

cur.execute("INSERT INTO SaveGame (SaveNumber,PlayerName, Id, levelNumber, TimeScore ) VALUES (?, ?,?,?,?)",
            ('1', 'Dog ','0','0','600')
            )

connection.commit()
connection.close()