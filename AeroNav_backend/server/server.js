const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// --- Define your API routes FIRST ---
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

// --- Serve React frontend ---
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ AeroNav server running on port ${PORT}`));
