const request = require('supertest');
const app = require('./app');

describe('GET /api/leaderboard', () => {
  it('should return the top 5 scores', async () => {
    const response = await request(app).get('/api/leaderboard');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(5);
  });
});

describe('POST /api/leaderboard', () => {
  it('should insert a new score into the leaderboard', async () => {
    const response = await request(app).post('/api/leaderboard').send({ name: 'Test User', score: 100 });
    expect(response.statusCode).toBe(200);
  });
});

describe('POST /api/public/leaderboard', () => {
  it('should send the leaderboard data to the provided URL', async () => {
    const response = await request(app).post('/api/public/leaderboard');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/saves', () => {
  it('should return the saved games data', async () => {
    const response = await request(app).get('/api/saves');
    expect(response.statusCode).toBe(200);
  });
});

describe('POST /api/saves/insert', () => {
  it('should insert a new saved game into the database', async () => {
    const response = await request(app).post('/api/saves/insert').send({ user_name: 'Test User', level: 1, time: 100 });
    expect(response.statusCode).toBe(200);
  });
});

describe('PUT /api/saves/:id', () => {
  it('should update an existing saved game in the database', async () => {
    const response = await request(app).put('/api/saves/1').send({ user_name: 'Test User', Time: 200, levels: [1, 2] });
    expect(response.statusCode).toBe(200);
  });
});

describe('DELETE /api/saves/delete/:id', () => {
  it('should delete an existing saved game from the database', async () => {
    const response = await request(app).delete('/api/saves/delete/1');
    expect(response.statusCode).toBe(200);
  });
});

describe('POST /api/saves/search', () => {
  it('should return the saved games data that match the user name', async () => {
    const response = await request(app).post('/api/saves/search').send({ user_name: 'Test User' });
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/about', () => {
  it('should return information about the game and developers', async () => {
    const response = await request(app).get('/api/about');
    expect(response.statusCode).toBe(200);
    expect(response.body.game.name).toBe('The Adventures of Coco and Koko');
    expect(response.body.developers.length).toBe(6);
  });
});

describe('GET /api/levels', () => {
  it('should return a list of available levels', async () => {
    const response = await request(app).get('/api/levels');
    expect(response.statusCode).toBe(200);
    expect(response.body.levels.length).toBe(3);
  });
});
