const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    genre: String,
    type: String,
    available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);