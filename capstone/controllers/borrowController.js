const Borrow = require('../models/borrowModel');
const Book = require('../models/bookModel');
const Return = require('../models/returnModel');

exports.borrowBook = async (req, res) => {
    const { username, bookId } = req.body;
    const borrow = new Borrow({ username, bookId });
    try {
        await borrow.save();
        await Book.findByIdAndUpdate(bookId, { available: false });
        res.status(200).send('Book borrowed');
    } catch (err) {
        res.status(400).send('Error borrowing book');
    }
};

exports.returnBook = async (req, res) => {
    const { bookId, username } = req.body;
    try {
        const borrowRecord = await Borrow.findOne({ bookId });
        let fine = 0;
        if (borrowRecord && borrowRecord.dueDate < new Date()) {
            const lateDays = Math.ceil((new Date() - borrowRecord.dueDate) / (1000 * 60 * 60 * 24));
            fine = lateDays * 5;  
        }
        const returnRecord = new Return({ username, bookId, fine });
        await returnRecord.save();
        await Borrow.deleteOne({ bookId });
        await Book.findByIdAndUpdate(bookId, { available: true });
        res.status(200).send('Book returned with fine: ' + fine);
    } catch (err) {
        res.status(400).send('Error returning book');
    }
};