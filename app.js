const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const apiRouter = require('./apiRouter');

const app = express();

const dbPath = './src/database/game.db';
const db = new sqlite3.Database(dbPath);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
