const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Create a connection to the game database
const dbPath = './src/database/game.db';
const db = new sqlite3.Database(dbPath);

const dbsPath = './src/database/user_database.db'
const dbs = new sqlite3.Database(dbsPath);

// IMPORTANT NOTE FOR THE API ENDPOINTS:
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
  const limit = req.query.limit || 5; // Set the limit to the query parameter or 5
  db.all(`SELECT * FROM leaderboard ORDER BY score DESC LIMIT ${limit}`, (err, rows) => {
    if (err) { // If there is an error, send a 500 status code and error message
      console.error(err);
      res.status(500).send('Internal server error.'); 
    } else { // If there is no error, send a 200 status code and the leaderboard data
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
  const { name, score } = req.body; // Destructure the name and score from the request body
  db.run('INSERT INTO leaderboard (name, score) VALUES (?, ?)', [name, score], (err) => {
    if (err) { // If there is an error, send a 500 status code and error message
      console.error(err);
      res.status(500).send('Internal server error.');
    } else { // If there is no error, send a 200 status code and success message
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
  const limit = 5; // Limit the number of results to 5
  db.all(`SELECT name, score FROM leaderboard ORDER BY score DESC LIMIT ${limit}`, (err, rows) => {
    if (err) { // If there is an error, send a 500 status code and error message
      console.error(err);
      res.status(500).send('Internal server error.');
    } else { // If there is no error, send a 200 status code and success message
      // Construct the JSON object
      const data = rows.reduce((acc, row, i) => { // Reduce the rows array to a single object
        const position = i + 1; // Add 1 to the index to get the position
        const nameKey = `${position} Name`; // Create the key for the name
        const scoreKey = `${position} score`; // Create the key for the score
        acc[nameKey] = row.name; // Add the name to the object
        acc[scoreKey] = row.score; // Add the score to the object
        return acc; // Return the object
      }, {});
      const json = {
        "data": [ // The data array is required by the API
          { 
            "Group": "G",
            "Title": "Top 5 Scores",
            ...data // Spread the data object into the JSON object
          }
        ]
      };

      // Send the JSON object to the provided URL
      const url = "https://eope3o6d7z7e2cc.m.pipedream.net/data";
      fetch(url, { // Use the Fetch API to send the JSON object
        method: "POST",
        headers: { // Set the headers to JSON
          "Content-Type": "application/json"
        },
        body: JSON.stringify(json) // Stringify the JSON object
      })
      .then(response => { // Log the response to the console
        if (response.ok) { // If the response is OK, log a success message
          console.log("Request successful");
        } else { // If the response is not OK, log a failure message
          console.log("Request failed");
        }
      })
      .catch(error => { // Log any errors to the console
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
  dbs.all(`SELECT * FROM saves ORDER BY SaveNumber DESC LIMIT ${limit}`, (err, rows) => {
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
    await dbs.run('INSERT INTO saves (user_name, id, points) VALUES (?, ?, ?)', [user_name, id, points]);
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



router.put('/saves', (req, res) => {
  const { user_name,Time  ,  levels, id } = req.body; // Destructure the name and score from the request body
  dbs.run('UPDATE saves SET PlayerName = ?  levelNumber = ?   Timescore = ?  WHERE Id = ?', [user_name, levels ,Time,id]);
});

/*
router.put('/saves', async (req, res) => {
  const { user_name, Id,  levels, Time } = req.body;

  if (!user_name || !levels) {
    res.status(400).send('User Name and levelnumber are required.');
  } else {
    await dbs.run('UPDATE saves SET PlayerName = ?, levelNumber = ?  , Timescore = ? ,WHERE id = ?', [user_name, levels, Time, Id]);
    res.status(200).send('OK');
  }
});
*/
/**
 * DELETE endpoint for deleting saved games data from the database
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Returns a success message in JSON format
 */
router.delete('/saves/delete/:id', async (req, res) => {
  const userId = req.params.id;

  await dbs.run('DELETE FROM savesWHERE id = ?', [userId]);
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
    const users = await dbs.all('SELECT * FROM saves WHERE user_name LIKE ?', ['%' + user_name + '%']);
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
      name: "Level 1",
      difficulty: "Easy"
    },
    {
      id: 2,
      name: "Level 2",
      difficulty: "Medium"
    },
    {
      id: 3,
      name: "Level 3",
      difficulty: "Hard"
    }
  ];
  res.json({ levels });
});

module.exports = router;