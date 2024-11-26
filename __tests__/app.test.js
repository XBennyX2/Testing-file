const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');

let mongoServer;

// Set up in-memory MongoDB before running tests
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Close the database connection after tests
afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

// Tests
describe('GET /', () => {
    it('should respond with a status code 200', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});
