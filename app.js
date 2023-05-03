const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const apiRouter = require('./api/apiRouter');

const app = express();

const dbPath = './src/database/game.db';
const db = new sqlite3.Database(dbPath);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/api', apiRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
