const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app"); // Assuming your app file is named 'app.js'

let mongoServer;
let server;

// Set up before all tests
beforeAll(async () => {
  // Start in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Connect to MongoDB (ensure only one connection)
  await mongoose.connect(uri, {
    useNewUrlParser: true, // Include options if needed
    useUnifiedTopology: true
  });

  // Start the server 
  server = app.listen(3000, () => {
    console.log("Test server running on port 3000");
  });
});

// Clean up after all tests
afterAll(async () => {
  // Graceful shutdown of MongoDB 
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
  server.close();
});

// Test suite for GET /api/auth
describe("GET /api/auth", () => {
  it("should return 200 status code", async () => {
    const res = await request(server).get("/api/auth");
    expect(res.statusCode).toBe(200);
  });
});