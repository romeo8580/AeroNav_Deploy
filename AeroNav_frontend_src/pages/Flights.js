import React, { useEffect, useState } from "react";
import { fetchFlights } from "../api";
export default function Flights() {
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    fetchFlights().then(setFlights);
  }, []);
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Flights</h1>
      {flights.length === 0 ? (
        <p>Loading flights...</p>
      ) : (
        <ul>
          {flights.map(flight => (
            <li key={flight.id}>
              {flight.code} — {flight.destination}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
