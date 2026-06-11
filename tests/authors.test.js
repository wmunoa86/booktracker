const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /authors', () => {
  it('should return 200 and an array', async () => {
    const res = await request(app).get('/authors');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /authors/:id', () => {
  it('should return 404 for a non-existent id', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/authors/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 for an invalid id format', async () => {
    const res = await request(app).get('/authors/invalid-id');
    expect(res.statusCode).toBe(500);
  });
});
