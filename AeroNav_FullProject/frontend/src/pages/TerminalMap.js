import React, { useEffect, useState } from "react";
import { fetchTerminalMap } from "../api";
export default function TerminalMap() {
  const [mapData, setMapData] = useState([]);
  const [selectedGate, setSelectedGate] = useState(null);
  useEffect(() => {
    fetchTerminalMap().then(setMapData);
  }, []);
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Terminal Map</h1>
      {mapData.length === 0 ? (
        <p>Loading terminal map...</p>
      ) : (
        <div style={{ width: "600px", height: "400px", border: "2px solid #ccc", position: "relative", background: "#f0f0f0", marginTop: "1rem" }}>
          {mapData.map(gate => (
            <div key={gate.id} onClick={() => setSelectedGate(gate)} style={{ position: "absolute", left: gate.x, top: gate.y, width: "40px", height: "40px", borderRadius: "50%", background: "orange", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              {gate.gate}
            </div>
          ))}
        </div>
      )}
      {selectedGate && <div style={{ marginTop: "1rem" }}>Selected Gate: {selectedGate.gate}</div>}
    </div>
  );
}
