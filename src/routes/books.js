const express = require('express');
const router = express.Router();
const BooksController = require('../controllers/booksController');

function setBookRoutes(app) {
    const booksController = new BooksController();
    
    router.get('/', (req, res, next) => booksController.getBooks(req, res, next));
    router.get('/:id', (req, res, next) => booksController.getBookById(req, res, next));
    router.post('/', (req, res, next) => booksController.addBook(req, res, next));
    router.put('/:id', (req, res, next) => booksController.updateBook(req, res, next));
    router.delete('/:id', (req, res, next) => booksController.deleteBook(req, res, next));

    app.use('/books', router);
}

module.exports = setBookRoutes;