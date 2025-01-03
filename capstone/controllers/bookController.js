const Book = require('../models/bookModel');

exports.createBook = async (req, res) => {
    const book = new Book(req.body);
    try {
        await book.save();
        res.status(201).send('Book added');
    } catch (err) {
        res.status(400).send('Error adding book');
    }
};

exports.getBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
};