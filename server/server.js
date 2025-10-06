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
