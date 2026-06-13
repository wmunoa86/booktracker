const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /books', () => {
  it('should return 200 and an array', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /books/:id', () => {
  it('should return a book by a valid existing ID', async () => {
    const allBooks = await request(app).get('/books');
    if (allBooks.body.length > 0) {
      const bookId = allBooks.body[0]._id;
      const res = await request(app).get(`/books/${bookId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('_id', bookId);
      expect(res.body).toHaveProperty('title');
    }
  });

  it('should return 404 for a non-existent id', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/books/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 for an invalid id format', async () => {
    const res = await request(app).get('/books/invalid-id');
    expect(res.statusCode).toBe(500);
  });
});
