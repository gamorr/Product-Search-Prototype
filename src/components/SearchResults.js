import React from "react";

const ProductResult = ({ id, name, price, cover_image }) => (
  <div
    key={id}
    style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}
  >
    <img
      src={cover_image}
      alt={name}
      style={{ maxWidth: "100px", maxHeight: "100px" }}
    />
    <div>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>Price: {price}</p>
    </div>
  </div>
);

const SearchResults = ({ results, searchType }) => {
  console.log("Results:", results);
  if (!results || !results.items || results.items.length === 0) {
    console.log("No results found");
    return <div>No results found</div>;
  }

  return (
    <div>
      <h2>Search Results</h2>
      {results.items.map((item) => (
        <ProductResult
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          cover_image={item.cover_image}
        />
      ))}
    </div>
  );
};

export default SearchResults;
