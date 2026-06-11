const Review = require('../models/Review');

const getAll = async (req, res) => {
  try {
    const reviews = await Review.find().populate('bookId', 'title').populate('userId', 'displayName');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('bookId', 'title').populate('userId', 'displayName');
    if (!review) return res.status(404).json({ error: 'Review not found.' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!review) return res.status(404).json({ error: 'Review not found.' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found.' });
    res.json({ message: 'Review deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
