const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  nationality: { type: String },
  birthYear:   { type: Number },
  biography:   { type: String },
  website:     { type: String }
});

module.exports = mongoose.model('Author', authorSchema);
