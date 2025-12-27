const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('borrowedBy', 'username');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a book
router.post('/', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Borrow a book
router.post('/:id/borrow', async (req, res) => {
  try {
    const { userId } = req.body;
    const book = await Book.findById(req.params.id);
    if (book.status === 'Borrowed') {
      return res.status(400).json({ error: 'Book already borrowed' });
    }
    book.status = 'Borrowed';
    book.borrowedBy = userId;
    book.dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Return a book
router.post('/:id/return', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    book.status = 'Available';
    book.borrowedBy = null;
    book.dueDate = null;
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
