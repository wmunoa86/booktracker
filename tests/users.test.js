const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /users', () => {
  it('should return 200 and an array', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /users/:id', () => {
  it('should return a user by a valid existing ID', async () => {
    const allUsers = await request(app).get('/users');
    if (allUsers.body.length > 0) {
      const userId = allUsers.body[0]._id;
      const res = await request(app).get(`/users/${userId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('_id', userId);
      expect(res.body).toHaveProperty('displayName');
    }
  });

  it('should return 404 for a non-existent id', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/users/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 for an invalid id format', async () => {
    const res = await request(app).get('/users/invalid-id');
    expect(res.statusCode).toBe(500);
  });
});
