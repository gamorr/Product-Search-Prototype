import React from "react";

const SearchResultGrid = ({ results }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "16px",
      }}
    >
      {results.items.map((result) => (
        <div
          key={result.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <h3>{result.name}</h3>
          <p>{result.price}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResultGrid;
