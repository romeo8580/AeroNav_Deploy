const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Fallback route for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Port configuration for Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ AeroNav server running on port ${PORT}`);
});
