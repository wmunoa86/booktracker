const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /reviews', () => {
  it('should return 200 and an array', async () => {
    const res = await request(app).get('/reviews');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /reviews/:id', () => {
  it('should return 404 for a non-existent id', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/reviews/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 for an invalid id format', async () => {
    const res = await request(app).get('/reviews/invalid-id');
    expect(res.statusCode).toBe(500);
  });
});
