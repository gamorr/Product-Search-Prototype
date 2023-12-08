import React, { useState, useEffect } from "react";

const SearchBar = () => {
  const [searchInput, updateSearchInput] = useState(""); //Search API
  const [suggestions, updateSuggestions] = useState([]); //Search Suggestion AP
  const [searchResults, updateSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // Search suggestion API constants
  const appKey = "family_fare"; //BOTH APIs
  const departmentId = "product"; //Search Suggestion API (OPTIONAL)
  const storeId = "6373"; //BOTH APIs
  const token = process.env.REACT_APP_TOKEN; //BOTH APIs
  const fields = "id,name,price"; //Search API
  const limit = 5; //Search API
  const relevanceSort = "asc"; //Search API (OPTIONAL)
  const renderId = 1701187538668; //Search API (OPTIONAL)
  const sort = "relevance";

  const handleChange = (e) => {
    const input = e.target.value;
    updateSearchInput(input);
    setSubmitClicked(false); // Reset submitClicked when input changes
    setShowDropdown(!!input); //show dropdown menu only if we have input
  };

  const handleSelectSuggestion = (selectedSuggestion) => {
    updateSearchInput(selectedSuggestion);
    setShowDropdown(false);
    setSubmitClicked(true); // Automatically trigger SearchAPI when suggestion is selected
  };

  // const SearchSubmit = () => {
  //   if (searchInput.length > 2) {
  //     setSubmitClicked(true);
  //   }
  // };

  const SearchSuggestionsAPI = async (query) => {
    try {
      const suggestionResponse = await fetch(
        `https://api.freshop.com/1/product_search_suggestions?q=${query}&app_key=${appKey}&${
          departmentId ? `department_id=${departmentId}&` : "" //departmentID is optional
        }store_id=${storeId}&token=${token}`
      );

      if (!suggestionResponse.ok) {
        throw new Error(
          `Search suggestion response NOT good: ${suggestionResponse.status}`
        );
      }

      const suggestionData = await suggestionResponse.json();

      console.log("Search Suggestion API Response:", suggestionData);

      if (suggestionData && suggestionData.q && suggestionData.variants) {
        const parsedSuggestions = [
          ...suggestionData.q,
          ...suggestionData.variants,
        ];
        updateSuggestions(parsedSuggestions);
      } else {
        updateSuggestions([]);
      }
    } catch (error) {
      console.error("Error searching for suggestions:", error.message);
      setError("Error searching for suggestions");
    } finally {
      setLoading(false);
    }
  };

  const SearchAPI = async (query) => {
    try {
      setLoading(true);
      setError(null);

      const searchResponse = await fetch(
        `https://api.freshop.com/1/products?q=${query}&app_key=${appKey}&store_id=${storeId}&token=${token}&fields=${fields}&limit=${limit}${
          relevanceSort ? `&relevance_sort=${relevanceSort}` : ""
        }${renderId ? `&render_id=${renderId}` : ""}${
          sort ? `&sort=${sort}` : ""
        }`
      );

      if (!searchResponse.ok) {
        throw new Error(`Search response NOT good: ${searchResponse.status}`);
      }

      const searchData = await searchResponse.json();

      console.log("Search API Response:", searchData);

      if (searchData && searchData.results) {
        updateSearchResults(searchData.results);
      } else {
        updateSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching for products:", error.message);
      setError("Error searching for products");
    } finally {
      setLoading(false);
    }
  };

  //makes sure Search Suggestion API automatically responds without clicking submit button
  useEffect(() => {
    // Debounce mechanism to limit API calls while typing
    const timer = setTimeout(() => {
      if (searchInput.length > 0 && !submitClicked) {
        SearchSuggestionsAPI(searchInput);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, submitClicked]);
  //handles Search API response when submit button clicked
  useEffect(() => {
    if (submitClicked) {
      SearchAPI(searchInput);
    }
  }, [submitClicked, searchInput]);

  return (
    <div>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />

      <ul style={{ display: showDropdown ? "block" : "none" }}>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSelectSuggestion(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>

      <button onClick={() => setSubmitClicked(true)}>Submit</button>

      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default SearchBar;
