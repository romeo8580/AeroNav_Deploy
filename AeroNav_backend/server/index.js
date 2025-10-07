const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Placeholder flight data
const flights = [
  { id: 1, code: "AA123", destination: "New York" },
  { id: 2, code: "DL456", destination: "Los Angeles" },
];

// Placeholder terminal map data
const terminalMap = [
  { id: 1, gate: "A1", x: 50, y: 100 },
  { id: 2, gate: "A2", x: 150, y: 100 },
];

// Routes
app.get("/flights", (req, res) => res.json(flights));
app.get("/terminal-map", (req, res) => res.json(terminalMap));
app.get("/search", (req, res) => {
  const q = (req.query.q || "").toLowerCase();
  const results = [
    ...flights.filter(f => f.code.toLowerCase().includes(q)),
    ...terminalMap.filter(g => g.gate.toLowerCase().includes(q))
  ];
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
