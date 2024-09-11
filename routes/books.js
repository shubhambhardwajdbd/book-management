const express = require('express');
const router = express.Router();
const Book = require('../models/book.model');

router.get('/', async (req, res, next) => {
    try {
        const books = await Book.find();
        res.render('books/index', { books: books });
    } catch (err) {
        next(err);
    }
});
router.get('/new', (req, res) => {
    res.render('books/new');
});


router.post('/', async (req, res, next) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        published_year: req.body.published_year,
    });

    try {
        const newBook = await book.save();
        res.redirect('/books');
    } catch (err) {
        next(err);
    }
});


router.get('/:id/edit', async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        res.render('books/edit', { book: book });
    } catch (err) {
        next(err);
    }
});


router.post('/:id', async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            book.title = req.body.title;
            book.author = req.body.author;
            book.published_year = req.body.published_year;
            await book.save();
            res.redirect('/books');
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        next(err);
    }
});


router.post('/:id/delete', async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            await book.remove();
            res.redirect('/books');
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        next(err);
    }
});



module.exports = router;


// module.exports = router;
