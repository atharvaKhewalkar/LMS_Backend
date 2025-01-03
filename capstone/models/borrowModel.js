const mongoose = require('mongoose');
const BorrowSchema = new mongoose.Schema({
    username: String,
    bookId: { type: mongoose.ObjectId, ref: 'Book', unique:true },
    dueDate: { type: Date, default: () => new Date(+new Date() + 15 * 24 * 60 * 60 * 1000) }
}, { timestamps: true });

module.exports = mongoose.model('Borrow', BorrowSchema); 