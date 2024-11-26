const express = require("express");
const cors = require("cors");
const notificationRoutes = require("./routes/notifications");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");
const reservationRoutes = require("./routes/reservations");

// Initialize app
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/notifications", notificationRoutes);

// Define root route
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

module.exports = app;