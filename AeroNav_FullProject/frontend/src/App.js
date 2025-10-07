import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Flights from "./pages/Flights";
import TerminalMap from "./pages/TerminalMap";
import Search from "./components/Search";
function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
        <Link to="/flights" style={{ marginRight: "1rem" }}>Flights</Link>
        <Link to="/map" style={{ marginRight: "1rem" }}>Terminal Map</Link>
        <Link to="/search">Search</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/map" element={<TerminalMap />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}
export default App;
