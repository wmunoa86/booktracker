const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title:         { type: String, required: true },
  isbn:          { type: String },
  genre:         { type: String },
  publishedYear: { type: Number },
  pageCount:     { type: Number },
  language:      { type: String, default: 'English' },
  coverImageUrl: { type: String },
  authorId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  addedByUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt:     { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
