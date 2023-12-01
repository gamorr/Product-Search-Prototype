import React, { useState, useEffect } from "react";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const getSuggestions = async () => {
      try {
        const response = await fetch(
          `https://api.freshop.com/1/product_search_suggestions`
        );

        if (!response.ok) {
          throw new Error("response NOT good");
        }

        const data = response.json();
        setSuggestions(data.suggestions);
      } catch (error) {
        console.error("Error getting suggestions: ", error);
      }
    };

    if (searchInput.length > 2) {
      getSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchInput]);

  return (
    <div>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />

      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
