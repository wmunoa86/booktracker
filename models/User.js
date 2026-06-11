const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId:    { type: String, required: true, unique: true },
  displayName: { type: String },
  email:       { type: String },
  avatarUrl:   { type: String },
  joinedAt:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
