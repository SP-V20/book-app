const BookModel = require('../models/book');

class BooksController {
    getBooks(req, res, next) {
        try {
            const books = BookModel.findAll();
            if (books.length === 0) {
                return res.json("No books available");
            }
            return res.json(books);
        } catch (err) {
            console.error(err);
            // return res.status(500).json({ error: err.message || 'Failed to get books' });
            next(err);
        }
    }

    getBookById(req, res, next) {
        try {
            const book = BookModel.findById(req.params.id);
            if (!book) {
                return res.status(404).json({ error: `Book with id ${req.params.id} not found.` });
            }
            return res.json(book);
        } catch (err) {
            console.error(err);
            // return res.status(500).json({ error: err.message || 'Failed to get book' });
            next(err);
        }
    }

    addBook(req, res, next) {
        const { id, title } = req.body || {};
        if (!id || !title) {
            return res.status(400).json({ error: 'ID and title are required' });
        }

        try {
            const book = BookModel.create({ id, title });
            return res.status(201).json(book);
        } catch (err) {
            console.error('Error creating book:', err);
            // return res.status(500).json({ error: 'Failed to create book', message: err.message });
            next(err);
        }
    }

    updateBook(req, res, next) {
        const { title } = req.body || {};
        const id = req.params.id;

        if (!title) return res.status(400).json({ error: 'Title is required' });

        try {
            const result = BookModel.update(id, title);
            if (!result || result.changes === 0) {
                return res.status(404).json({ error: `Book with id ${id} not found.` });
            }
            return res.json({ id, title });
        } catch (err) {
            console.error(err);
            // return res.status(500).json({ error: err.message || 'Failed to update book' });
            next(err);
        }
    }

    deleteBook(req, res, next) {
        const id = req.params.id;
        try {
            const result = BookModel.delete(id);
            if (!result || result.changes === 0) {
                return res.status(404).json({ error: `Book with id ${id} not found.` });
            }
            return res.json({ message: `Book with id ${id} deleted successfully.` });
        } catch (err) {
            console.error(err);
            // return res.status(500).json({ error: err.message || 'Failed to delete book' });
            next(err);
        }
    }
}

module.exports = BooksController;
