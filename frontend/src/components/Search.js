import React, { useState } from "react";
import { search } from "../api";
export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const handleSearch = async () => {
    const res = await search(query);
    setResults(res);
  };
  return (
    <div style={{ margin: "1rem 0", padding: "1rem" }}>
      <input type="text" value={query} placeholder="Search flights, gates, etc." onChange={e => setQuery(e.target.value)} style={{ padding: "0.5rem", width: "200px" }} />
      <button onClick={handleSearch} style={{ marginLeft: "0.5rem", padding: "0.5rem" }}>Search</button>
      {results.length > 0 && (
        <ul style={{ marginTop: "1rem" }}>
          {results.map((item, index) => (<li key={index}>{item.type.toUpperCase()}: {item.name}</li>))}
        </ul>
      )}
    </div>
  );
}
