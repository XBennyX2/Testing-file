const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");

let server;
let mongoServer;

beforeAll(async () => {
    // Set up in-memory MongoDB
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Start the server
    server = app.listen(3000);
});

afterAll(async () => {
    // Clean up
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
    server.close();
});

describe("GET /api/auth", () => {
    it("should return 200 status code", async () => {
        const res = await request(server).get("/api/auth");
        expect(res.statusCode).toBe(200);
    });
});
