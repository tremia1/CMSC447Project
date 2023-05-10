const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Create a connection to the game database
const dbPath = './src/database/game.db';
const db = new sqlite3.Database(dbPath);

// Make sure to to call the API with /api/ in front of the endpoint
// Example: http://localhost:3000/api/leaderboard

/**
 * GET endpoint for retrieving the top scores from the leaderboard
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Returns the leaderboard data in JSON format
 */
router.get('/leaderboard', (req, res) => {
  const limit = req.query.limit || 5;
  db.all(`SELECT * FROM leaderboard ORDER BY score DESC LIMIT ${limit}`, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error.');
    } else {
      res.json(rows);
    }
  });
});

/**
 * POST endpoint for inserting new leaderboard data into the database
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Returns a success message in JSON format
 */

router.post('/leaderboard', (req, res) => {
  const { name, score } = req.body;
  db.run('INSERT INTO leaderboard (name, score) VALUES (?, ?)', [name, score], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error.');
    } else {
      res.status(200).send('OK');
    }
  });
});

/**
 * POST endpoint for sending the leaderboard data to the provided URL
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Returns a success message in JSON format
 */

router.post('/public/leaderboard', (req, res) => {
  // Retrieve the leaderboard data from the database
  const limit = 5;
  db.all(`SELECT name, score FROM leaderboard ORDER BY score DESC LIMIT ${limit}`, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error.');
    } else {
      // Construct the JSON object
      const data = rows.reduce((acc, row, i) => {
        const position = i + 1;
        const nameKey = `${position} Name`;
        const scoreKey = `${position} score`;
        acc[nameKey] = row.name;
        acc[scoreKey] = row.score;
        return acc;
      }, {});
      const json = {
        "data": [
          {
            "Group": "G",
            "Title": "Top 5 Scores",
            ...data
          }
        ]
      };

      // Send the JSON object to the provided URL
      const url = "https://eope3o6d7z7e2cc.m.pipedream.net/data";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
      })
      .then(response => {
        if (response.ok) {
          console.log("Request successful");
        } else {
          console.log("Request failed");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });

      // Send the response back to the client
      res.status(200).send('OK');
    }
  });
});

/**
 * GET endpoint for retrieving the user's saved games
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Returns the saved games data in JSON format
 */
router.get('/saves', (req, res) => {
  const limit = req.query.limit || 5;
  db.all(`SELECT * FROM saves ORDER BY SaveNumber DESC LIMIT ${limit}`, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error.');
    } else {
      res.json(rows);
    }
  });
});

/**
 * POST endpoint for inserting new saved games data into the database
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Returns a success message in JSON format
 */
router.post('/saves/insert', async (req, res) => {
  const { user_name, id, points } = req.body;

  if (!user_name || !id || !points) {
    res.status(400).send('All fields are required.');
  } else {
    await db.run('INSERT INTO saves (user_name, id, points) VALUES (?, ?, ?)', [user_name, id, points]);
    res.status(200).send('OK');
  }
});

/**
 * PUT endpoint for updating existing saved games data in the database
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Returns a success message in JSON format
 */
router.put('/saves/edit/:id', async (req, res) => {
  const userId = req.params.id;
  const { user_name, points } = req.body;

  if (!user_name || !points) {
    res.status(400).send('User Name and Points are required.');
  } else {
    await db.run('UPDATE saves SET user_name = ?, points = ? WHERE id = ?', [user_name, points, userId]);
    res.status(200).send('OK');
  }
});

/**
 * DELETE endpoint for deleting saved games data from the database
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Returns a success message in JSON format
 */
router.delete('/saves/delete/:id', async (req, res) => {
  const userId = req.params.id;

  await db.run('DELETE FROM savesWHERE id = ?', [userId]);
  res.status(200).send('OK');
});

/**
 * POST endpoint for searching saved games data in the database
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Returns the matching saved games data in JSON format
 */
router.post('/saves/search', async (req, res) => {
  const { user_name } = req.body;

  if (!user_name) {
    res.status(400).send('User Name is required.');
  } else {
    const users = await db.all('SELECT * FROM saves WHERE user_name LIKE ?', ['%' + user_name + '%']);
    res.json(users);
  }
});

/**
 * GET endpoint for retrieving information about the game and developers
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Returns game and developer information in JSON format
 */
router.get('/about', (req, res) => {
  const game = {
    name: 'The Adventures of Coco and Koko',
    version: '1.0.0',
    description: '.'
  };

  const developers = [
    { name: 'Mike Anuruo' },
    { name: 'Daniel Godard' },
    { name: 'Tre\'mia Johnson' },
    { name: 'Fred Low' },
    { name: 'Weng Weizhang' },
    { name: 'Michael Parchment' }
  ];

  const about = {
    game: game,
    developers: developers,
  };

  res.json(about);
});

/**
 * GET endpoint for retrieving a list of available levels in the game
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Returns a list of available levels in JSON format
 */
router.get('/levels', (req, res) => {
  const levels = [
    {
      id: 1,
      name: "TBD",
      difficulty: "Easy"
    },
    {
      id: 2,
      name: "TBD",
      difficulty: "Medium"
    },
    {
      id: 3,
      name: "TBD",
      difficulty: "Hard"
    }
  ];
  res.json({ levels });
});

module.exports = router;