const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const leaderboardDbPath = './src/database/game.db';
const leaderboardDb = new sqlite3.Database(leaderboardDbPath);

const userDbPath = './src/database/user_database.db';
const userDb = new sqlite3.Database(userDbPath);

router.get('/leaderboard', (req, res) => {
  const limit = req.query.limit || 5;
  leaderboardDb.all(`SELECT * FROM leaderboard ORDER BY score DESC LIMIT ${limit}`, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error.');
    } else {
      res.json(rows);
    }
  });
});

router.post('/leaderboard', (req, res) => {
  const { name, score } = req.body;
  leaderboardDb.run('INSERT INTO leaderboard (name, score) VALUES (?, ?)', [name, score], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error.');
    } else {
      res.status(200).send('OK');
    }
  });
});

function getDbConnection(dbPath) {
  const conn = new sqlite3.Database(dbPath);
  conn.row_factory = sqlite3.Row;
  return conn;
}

function getUser(userId) {
  const conn = getDbConnection(userDbPath);
  const user = conn.get('SELECT * FROM saves WHERE id = ?', [userId]);
  conn.close();
  return user;
}

router.get('/users', async (req, res) => {
  const users = await userDb.all('SELECT * FROM saves');
  res.json(users);
  console.log(users);
});

router.post('/users/insert', async (req, res) => {
  const { user_name, id, points } = req.body;

  if (!user_name || !id || !points) {
    res.status(400).send('All fields are required.');
  } else {
    await userDb.run('INSERT INTO saves (user_name, id, points) VALUES (?, ?, ?)', [user_name, id, points]);
    res.status(200).send('OK');
  }
});

router.put('/users/edit/:id', async (req, res) => {
  const userId = req.params.id;
  const { user_name, points } = req.body;

  if (!user_name || !points) {
    res.status(400).send('User Name and Points are required.');
  } else {
    await userDb.run('UPDATE saves SET user_name = ?, points = ? WHERE id = ?', [user_name, points, userId]);
    res.status(200).send('OK');
  }
});

router.delete('/users/delete/:id', async (req, res) => {
  const userId = req.params.id;

  await userDb.run('DELETE FROM savesWHERE id = ?', [userId]);
  res.status(200).send('OK');
});

router.post('/users/search', async (req, res) => {
  const { user_name } = req.body;

  if (!user_name) {
    res.status(400).send('User Name is required.');
  } else {
    const users = await userDb.all('SELECT * FROM saves WHERE user_name LIKE ?', ['%' + user_name + '%']);
    res.json(users);
  }
});

module.exports = router;