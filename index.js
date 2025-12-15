const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const errorHandler = require('./src/middleware/errorHandler');
const setBookRoutes = require('./src/routes/books');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Swagger UI route

app.use(express.json());

app.get('/__health', (req, res) => res.json({ ok: true, pid: process.pid })); // quick health/test route

setBookRoutes(app);
app.use(errorHandler);

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});