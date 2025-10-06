const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.get("/api/status", (req, res) => {
  res.json({ status: "AeroNav backend is running!" });
});

app.get("/api/flights", (req, res) => {
  res.json([
    { flight: "AA123", gate: "B12", status: "On Time" },
    { flight: "DL456", gate: "C7", status: "Delayed" }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// server/server.js
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve the React build folder
const frontendPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendPath));

// Example API route
app.get("/api/status", (req, res) => {
  res.json({ status: "AeroNav backend running successfully 🚀" });
});

// Fallback for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ AeroNav server running on port ${PORT}`);
});
