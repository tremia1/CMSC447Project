const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const dbPath = './src/database/game.db';
const db = new sqlite3.Database(dbPath);

router.get('/high-scores', (req, res) => {
  // Default limit is set to top five scores.
  const limit = req.query.limit || 5; 
  db.all(`SELECT * FROM high_scores ORDER BY score DESC LIMIT ${limit}`, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error.');
    } else {
      res.json(rows);
    }
  });
});

router.post('/high-scores', (req, res) => {
  const { name, score } = req.body;
  db.run('INSERT INTO high_scores (name, score) VALUES (?, ?)', [name, score], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error.');
    } else {
      res.status(200).send('OK');
    }
  });
});

module.exports = router;
