import React, { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("");
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch("https://YOUR_BACKEND_URL_HERE/api/status")
      .then((res) => res.json())
      .then((data) => setStatus(data.status));

    fetch("https://YOUR_BACKEND_URL_HERE/api/flights")
      .then((res) => res.json())
      .then((data) => setFlights(data));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>AeroNav Frontend</h1>
      <p>{status}</p>

      <h2>Flights</h2>
      <ul>
        {flights.map((f) => (
          <li key={f.flight}>
            {f.flight} – Gate {f.gate} – {f.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
