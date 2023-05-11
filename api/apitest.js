const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./game.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the game database.');
});

db.run(
  'CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY AUTOINCREMENT, player_name TEXT, score INTEGER)'
);

module.exports = db;