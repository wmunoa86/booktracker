require('dotenv').config();
const mongoose = require('mongoose');
const Author = require('../models/Author');
const Book = require('../models/Book');
const Review = require('../models/Review');
const User = require('../models/User');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB. Seeding...');

  await Author.deleteMany({});
  await Book.deleteMany({});
  await Review.deleteMany({});
  await User.deleteMany({});

  const authors = await Author.insertMany([
    { name: 'George Orwell', nationality: 'British', birthYear: 1903, biography: 'English novelist and essayist.', website: 'https://www.orwellfoundation.com' },
    { name: 'J.K. Rowling', nationality: 'British', birthYear: 1965, biography: 'Author of the Harry Potter series.', website: 'https://www.jkrowling.com' },
    { name: 'Gabriel García Márquez', nationality: 'Colombian', birthYear: 1927, biography: 'Nobel Prize-winning novelist.', website: '' }
  ]);

  const users = await User.insertMany([
    { githubId: 'seed_user_1', displayName: 'Alice Reader', email: 'alice@example.com', avatarUrl: '' },
    { githubId: 'seed_user_2', displayName: 'Bob Bookworm', email: 'bob@example.com', avatarUrl: '' }
  ]);

  const books = await Book.insertMany([
    { title: '1984', isbn: '978-0451524935', genre: 'Dystopian', publishedYear: 1949, pageCount: 328, language: 'English', authorId: authors[0]._id, addedByUserId: users[0]._id },
    { title: 'Animal Farm', isbn: '978-0451526342', genre: 'Political Satire', publishedYear: 1945, pageCount: 112, language: 'English', authorId: authors[0]._id, addedByUserId: users[0]._id },
    { title: "Harry Potter and the Philosopher's Stone", isbn: '978-0439708180', genre: 'Fantasy', publishedYear: 1997, pageCount: 309, language: 'English', authorId: authors[1]._id, addedByUserId: users[1]._id },
    { title: 'One Hundred Years of Solitude', isbn: '978-0060883287', genre: 'Magical Realism', publishedYear: 1967, pageCount: 417, language: 'Spanish', authorId: authors[2]._id, addedByUserId: users[1]._id }
  ]);

  await Review.insertMany([
    { bookId: books[0]._id, userId: users[0]._id, rating: 5, title: 'A timeless warning', body: 'Every page feels more relevant today than ever.', containsSpoilers: false },
    { bookId: books[2]._id, userId: users[1]._id, rating: 5, title: 'Pure magic', body: 'This book started my love of reading.', containsSpoilers: false },
    { bookId: books[3]._id, userId: users[0]._id, rating: 4, title: 'Dense but rewarding', body: 'Requires patience but is deeply moving.', containsSpoilers: true }
  ]);

  console.log('Seeding complete.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
