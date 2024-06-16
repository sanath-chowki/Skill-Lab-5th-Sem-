const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
