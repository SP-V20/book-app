const express = require('express');
const app = express();
const setBookRoutes = require('./src/routes/books');

app.use(express.json());

// quick health/test route
app.get('/__health', (req, res) => res.json({ ok: true, pid: process.pid }));

setBookRoutes(app);

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});