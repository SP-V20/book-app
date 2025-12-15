const db = require('../../db');

class BookModel {
  static create({ id, title }) {
    return db.prepare('INSERT INTO books (id, title) VALUES (?, ?)').run(id, title);
  }

  static findAll() {
    return db.prepare('SELECT id, title FROM books').all();
  }

  static findById(id) {
    return db.prepare('SELECT id, title FROM books WHERE id = ?').get(id);
  }

  static update(id, title) {
    return db.prepare('UPDATE books SET title = ? WHERE id = ?').run(title, id);
  }

  static delete(id) {
    return db.prepare('DELETE FROM books WHERE id = ?').run(id);
  }
}

module.exports = BookModel;
