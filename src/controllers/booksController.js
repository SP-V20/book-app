const db = require('../../db');

class BooksController {
    addBook(req,res) {
        const { id,title } = req.body || {};
        if (!title || !id) return res.status(400).json({ error: 'title and id required' });

        db.prepare('INSERT INTO books (id, title) VALUES (?, ?)').run(id, title);

        res.status(201).json(req.body);
    }

    getBooks(req, res) {
        const rows = db.prepare('SELECT id, title FROM books').all();
        if(rows.length === 0) {
            console.log("No books found in the database.");
            return res.json("No books available");
        } else {
            console.log(`Found ${rows.length} books in the database.`);
            return res.json(rows);
        }
    }

    getBookById(req, res) {
        const id = req.params.id;
        const row = db.prepare('SELECT id, title FROM books WHERE id = ?').get(id);
        if (!row) {
            console.log(`Book with id ${id} not found.`);
            return res.status(404).json({ error: `Book with id ${id} not found.`});
        } else {
            console.log(`Book with id ${id} found:`, row);
            return res.json(row);
        }
    }

    deleteBook(req, res) {
        const id = req.params.id;
        const result = db.prepare('DELETE FROM books WHERE id = ?').run(id);
        if (result.changes === 0) {
            console.log(`Book with id ${id} not found for deletion.`);
            return res.status(404).json({ error: `Book with id ${id} not found.`});
        } else {
            console.log(`Book with id ${id} deleted successfully.`);
            return res.json({ message: `Book with id ${id} deleted successfully.`});
        }
    }

    updateBook(req, res) {
        const id = req.params.id;
        const { title } = req.body || {};
        if (!title) return res.status(400).json({ error: 'title is required' });

        const result = db.prepare('UPDATE books SET title = ? WHERE id = ?').run(title, id);
        if (result.changes === 0) {
            console.log(`Book with id ${id} not found for update.`);
            return res.status(404).json({ error: `Book with id ${id} not found.`});
        } else {
            console.log(`Book with id ${id} updated successfully.`);
            return res.json({ id, title });
        }
    }
}
module.exports = BooksController;