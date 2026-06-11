const Book = require('../models/Book');

const getAll = async (req, res) => {
  try {
    const books = await Book.find().populate('authorId', 'name').populate('addedByUserId', 'displayName');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('authorId', 'name').populate('addedByUserId', 'displayName');
    if (!book) return res.status(404).json({ error: 'Book not found.' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ error: 'Book not found.' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found.' });
    res.json({ message: 'Book deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
