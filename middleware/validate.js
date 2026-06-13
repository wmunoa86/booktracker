const mongoose = require('mongoose');

function validateBook(req, res, next) {
  const { title, authorId, addedByUserId } = req.body;
  if (!title || !authorId) {
    return res.status(400).json({ error: 'title and authorId are required.' });
  }
  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res.status(400).json({ error: 'authorId must be a valid MongoDB ObjectId (24-character hex string).' });
  }
  if (addedByUserId === '') {
    delete req.body.addedByUserId;
  } else if (addedByUserId && !mongoose.Types.ObjectId.isValid(addedByUserId)) {
    return res.status(400).json({ error: 'addedByUserId must be a valid MongoDB ObjectId (24-character hex string).' });
  }
  next();
}

function validateAuthor(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name is required.' });
  }
  next();
}

function validateReview(req, res, next) {
  const { bookId, userId, rating, title } = req.body;
  if (!bookId || !userId || !rating || !title) {
    return res.status(400).json({ error: 'bookId, userId, rating, and title are required.' });
  }
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ error: 'bookId must be a valid MongoDB ObjectId (24-character hex string).' });
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'userId must be a valid MongoDB ObjectId (24-character hex string).' });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'rating must be between 1 and 5.' });
  }
  next();
}

function validateUser(req, res, next) {
  const { displayName } = req.body;
  if (!displayName) {
    return res.status(400).json({ error: 'displayName is required.' });
  }
  next();
}

module.exports = { validateBook, validateAuthor, validateReview, validateUser };

