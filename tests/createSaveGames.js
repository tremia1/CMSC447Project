const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const gameDbPath = path.resolve(__dirname, '../src/database/test.db');

// Create saves table in the game database and insert initial data
const createSaveGames = () => {
  const db = new sqlite3.Database(gameDbPath, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the game database.');
    }
  });

  const schema = `
    CREATE TABLE IF NOT EXISTS saves (
      SaveNumber INTEGER,
      PlayerName TEXT NOT NULL,
      Id INTEGER,
      levelNumber INTEGER,
      TimeScore INTEGER
    );
  `;

  db.exec(schema, (err) => {
    if (err) {
      console.error('Error creating saves table:', err.message);
    } else {
      console.log('saves table created or already exists.');
    }
  });

  const initialData = [
    { SaveNumber: 1, PlayerName: 'Jack', Id: 0, levelNumber: 0, TimeScore: 600 },
    { SaveNumber: 1, PlayerName: 'Bob', Id: 0, levelNumber: 0, TimeScore: 600 },
    { SaveNumber: 1, PlayerName: 'Mary', Id: 0, levelNumber: 0, TimeScore: 600 },
    { SaveNumber: 1, PlayerName: 'Kat', Id: 0, levelNumber: 0, TimeScore: 600 },
    { SaveNumber: 1, PlayerName: 'Dog', Id: 0, levelNumber: 0, TimeScore: 600 },
  ];

  const insertSaveGameData = db.prepare('INSERT INTO saves (SaveNumber, PlayerName, Id, levelNumber, TimeScore) VALUES (?, ?, ?, ?, ?)');

  initialData.forEach((entry) => {
    insertSaveGameData.run(entry.SaveNumber, entry.PlayerName, entry.Id, entry.levelNumber, entry.TimeScore, (err) => {
      if (err) {
        console.error('Error inserting save game data:', err.message);
      }
    });
  });

  insertSaveGameData.finalize((err) => {
    if (err) {
      console.error('Error finalizing statement:', err.message);
    } else {
      console.log('Initial save game data inserted successfully.');
    }
  });

  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Closed the database connection.');
    }
  });
};

createSaveGames();
