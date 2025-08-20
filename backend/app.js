const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const storeOwnerRoutes = require("./routes/storeOwnerRoutes");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

// Sync models with database
sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Database sync error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/store-owner", storeOwnerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

module.exports = app;
