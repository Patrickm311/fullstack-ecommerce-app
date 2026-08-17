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
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.post("/api/test-checkout", (req, res) => {
  console.log(req.body);

  res.json({
    message: "Checkout details received!",
    receivedData: req.body
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("Server error:", err);
});