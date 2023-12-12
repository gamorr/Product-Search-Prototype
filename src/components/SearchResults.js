import React from "react";

const SearchResults = ({ results }) => {
  return (
    <div>
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result.id}>
              <strong>{result.name}</strong> - ${result.price}
            </li>
          ))}
        </ul>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default SearchResults;
