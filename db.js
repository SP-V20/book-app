const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, 'data', 'books.db');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS books (
    id NUMBER PRIMARY KEY,
    title TEXT NOT NULL
  )
`).run();

module.exports = db;