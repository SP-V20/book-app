const express = require('express');
const router = express.Router();
const BooksController = require('../controllers/booksController');

function setBookRoutes(app) {
    const booksController = new BooksController();
    
    router.get('/', (req, res) =>  booksController.getBooks(req, res));
    router.get('/:id', (req, res) => booksController.getBookById(req, res));
    router.post('/', (req, res) => booksController.addBook(req, res));
    router.put('/:id', (req, res) => booksController.updateBook(req, res));
    router.delete('/:id', (req, res) => booksController.deleteBook(req, res));

    app.use('/books', router);
}

module.exports = setBookRoutes;