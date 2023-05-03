const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

async function deleteDatabaseFile() {
  try {
    const dbPath = path.join(__dirname, '..', 'src', 'database', 'test.db');
    await promisify(fs.unlink)(dbPath);
    console.log('Database file deleted successfully.');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Database file not found. Continuing...');
    } else {
      console.error('Error deleting database file:', error);
    }
  }
}

async function runTestScript(test) {
  console.log(`\n========== Running Test: ${test.name} ==========`);
  console.log(`Test Description: ${test.description}`);
  try {
    const { stdout, stderr } = await exec(`node ${test.path}`);
    console.log(`Test script stdout: ${stdout}`);
    if (stderr) {
      console.error(`Test script stderr: ${stderr}`);
    }
    console.log(`Status: ${test.name} - PASSED`);
  } catch (error) {
    console.error(`Status: ${test.name} - FAILED`);
    console.error(`Error running test script: ${error}`);
  }
}

async function runAllTests() {
  const tests = [
    {
      name: 'createLeaderboard',
      description: 'Test to create a leaderboard table and insert initial top scores.',
      path: path.join(__dirname, 'createLeaderboard.js')
    },
    {
      name: 'createSaveGames',
      description: 'Test to create a save games table and insert initial save data.',
      path: path.join(__dirname, 'createSaveGames.js')
    }
  ];

  for (const test of tests) {
    await runTestScript(test);
  }

  console.log('\nAll tests completed.');
}

(async () => {
  await deleteDatabaseFile();
  await runAllTests();
})();
