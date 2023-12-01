import React, { useState, useEffect } from "react";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  const appKey = "family_fare";
  const departmentId = "product";
  const storeId = "6373";
  const token = "e78b34d2b4e11d4436ab5b4609baade1";

  useEffect(() => {
    const getSuggestions = async () => {
      try {
        const response = await fetch(
          `https://api.freshop.com/1/product_search_suggestions?app_key=${appKey}&department_id=${departmentId}&q=${searchInput}&store_id=${storeId}&token=${token}`
        );

        if (!response.ok) {
          throw new Error("response NOT good");
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data && data.suggestions) {
          setSuggestions(data.suggestions);
        } else {
          setSuggestions([]);
        }
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

  // use for testing
  // console.log("Current Suggestions:", suggestions);

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

      <p>
        {suggestions.length > 0
          ? `Suggestions: ${suggestions.join(", ")}`
          : "No suggestions"}
      </p>
    </div>
  );
};

export default SearchBar;
