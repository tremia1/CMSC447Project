const sqlite3 = require('sqlite3');
const express = require("express");

var app = express();

const port = 3004;




const db = new sqlite3.Database('./SaveGames.db', (err) => {
    if (err) {
        console.error("Erro opening database " + err.message);
    } else {

        db.run('CREATE TABLE SaveGame( \
            SaveNumber INT NOT NULL,\
            PlayerName TEXT NOT NULL,\
            Id INT NOT NULL,\
            LevelNumber INT NOT NULL,\
            TimeScore INT NOT NULL\)', (err) => {
            if (err) {
                console.log("Table already exists.");
            }
            let insert = 'INSERT INTO SaveGame (SaveNumber,PlayerName, Id, LevelNumber, TimeScore) VALUES (?,?,?,?,?)';
            db.run(insert, ["1", "Jack", 01, 0, 200]);
            db.run(insert, ["2", "Mary",  02, 0, 230]);
            db.run(insert, ["3", "Paul",  03, 0, 120]);
            db.run(insert, ["4", "George",  04, 0, 3600]);
            db.run(insert, ["5", "Elizabeth",  05, 0, 4000]);


        });
    }
});

app.get("/GetSave/:id", (req, res, next) => {
    var params = [req.params.id]
    db.get("SELECT * FROM SaveGame where SaveNumber = ?", [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json(row);
    });
});




app.patch("/SaveGame", (req, res, next) => {
    var reqBody = re.body;
    db.run(`UPDATE SaveGame set PlayerName = ?, Id = ?, LevelNumber = ?, TimeScore = ? WHERE SaveNumber = ?`,
        [reqBody.PlayerName, Id.first_name, reqBody. LevelNumber, reqBody.TimeScore, reqBody.SaveNumber],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
});

