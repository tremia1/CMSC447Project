const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const gameDbPath = path.resolve(__dirname, '../src/database/game.db');

// Create leaderboard table in the game database
const createLeaderboard = () => {
  const db = new sqlite3.Database(gameDbPath, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the game database.');
    }
  });

  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS leaderboard (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        score INTEGER NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error('Error creating leaderboard table:', err.message);
        } else {
          console.log('leaderboard table created or already exists.');
        }
      }
    );

    const initialData = [
      { name: 'Alice', score: 500},
      { name: 'Bob', score: 400 },
      { name: 'Carol', score: 300 },
      { name: 'Dave', score: 200 },
      { name: 'Eve', score: 100 },
    ];

    const insertTopScore = db.prepare('INSERT INTO leaderboard (name, score) VALUES (?, ?)');

    initialData.forEach((entry) => {
      insertTopScore.run(entry.name, entry.score, (err) => {
        if (err) {
          console.error('Error inserting top score data:', err.message);
        }
      });
    });

    insertTopScore.finalize((err) => {
      if (err) {
        console.error('Error finalizing statement:', err.message);
      } else {
        console.log('Initial top scores data inserted successfully.');
      }
    });

  });

  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Closed the database connection.');
    }
  });
};

createLeaderboard();
