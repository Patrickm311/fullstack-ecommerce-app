const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const db = require("./config/database");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "..", "public")));

// API routes
app.use("/api/products", require("./routes/products"));

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("Server error:", err);
});