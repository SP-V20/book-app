const request = require('supertest');
const app = require('../src/index'); // Adjust the path as necessary

describe('Books API', () => {
    it('should create a new book', async () => {
        const res = await request(app)
            .post('/api/books')
            .send({
                title: 'Test Book',
                author: 'Test Author',
                isbn: '1234567890'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should retrieve all books', async () => {
        const res = await request(app).get('/api/books');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should retrieve a book by id', async () => {
        const res = await request(app).get('/api/books/1'); // Adjust the ID as necessary
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title');
    });

    it('should delete a book by id', async () => {
        const res = await request(app).delete('/api/books/1'); // Adjust the ID as necessary
        expect(res.statusCode).toEqual(204);
    });
});