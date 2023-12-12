import React, { useState, useEffect, useRef } from "react";
import { styles } from "./style/searchBarStyle";
import SearchInput from "./SearchInput";
import SubmitButton from "./SubmitButton";
import LoadingIndicator from "./LoadingIndicator";
import ErrorMessage from "./ErrorMessage";
import SearchResults from "./SearchResults";
import DropdownMenu from "./DropdownMenu";
import SearchResultGrid from "./SearchResultGrid";

const SearchBar = ({ style }) => {
  const [searchInput, updateSearchInput] = useState("");
  const [suggestionsQ, updateSuggestionsQ] = useState([]);
  const [suggestionsVariants, updateSuggestionsVariants] = useState([]);
  const [searchResults, updateSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showResultGrid, setShowResultGrid] = useState(false);
  const suggestionsContainerRef = useRef(null);
  const appKey = "family_fare";
  const departmentId = "product";
  const storeId = "6373";
  const token = process.env.REACT_APP_TOKEN;
  const fields = "id, name, price, cover_image";
  const limit = 5;

  const handleChange = (e) => {
    const input = e.target.value;
    updateSearchInput(input);
    setSubmitClicked(false);
    setShowDropdown(!!input);
  };

  const handleSearchSubmit = () => {
    setSubmitClicked(true);
    //clear suggestions on submit for a cleaner UI
    updateSuggestionsQ([]);
    updateSuggestionsVariants([]);
    setShowResultGrid(true);
  };

  const handleSelectSuggestion = (selectedSuggestion) => {
    updateSearchInput(selectedSuggestion);
    setShowDropdown(false);
    setSubmitClicked(true);
    // Clear suggestions here if needed
    updateSuggestionsQ([]);
    updateSuggestionsVariants([]);
  };

  const SearchSuggestionsAPI = async (query) => {
    try {
      setLoading(true);
      setError(null);

      const suggestionResponse = await fetch(
        `https://api.freshop.com/1/product_search_suggestions?q=${query}&app_key=${appKey}&${
          departmentId ? `department_id=${departmentId}&` : ""
        }store_id=${storeId}&token=${token}`
      );

      if (!suggestionResponse.ok) {
        throw new Error(
          `Search suggestion response NOT good: ${suggestionResponse.status}`
        );
      }

      const suggestionData = await suggestionResponse.json();

      console.log("Search Suggestion API Response:", suggestionData);

      if (suggestionData?.q) {
        updateSuggestionsQ(suggestionData.q);
      } else {
        updateSuggestionsQ([]);
      }

      if (suggestionData?.variants) {
        updateSuggestionsVariants(suggestionData.variants);
      } else {
        updateSuggestionsVariants([]);
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
        `https://api.freshop.com/1/products?q=${query}&app_key=${appKey}&store_id=${storeId}&token=${token}&fields=${fields}&limit=${limit}`
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

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchInput.length > 0 && !submitClicked) {
        SearchSuggestionsAPI(searchInput);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchInput]);

  useEffect(() => {
    if (submitClicked) {
      SearchAPI(searchInput);
      setSubmitClicked(false);
      //clear suggestions on submit here too
      updateSuggestionsQ([]);
      updateSuggestionsVariants([]);
    }
  }, [submitClicked, searchInput]);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (
        suggestionsContainerRef.current &&
        !suggestionsContainerRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [suggestionsContainerRef]);

  return (
    <div style={style}>
      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        <SearchInput
          value={searchInput}
          onChange={handleChange}
          onFocus={() => setShowDropdown(!!searchInput)}
          onBlur={() => setShowDropdown(false)}
        />

        <SubmitButton
          onClick={handleSearchSubmit}
          style={{ marginleft: "8px" }}
        />
      </div>

      {showDropdown && (
        <DropdownMenu
          suggestionsQ={suggestionsQ}
          onSelectSuggestion={handleSelectSuggestion}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            background: "white",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        />
      )}

      {loading && <LoadingIndicator />}

      {error && <ErrorMessage message={error} />}

      {showResultGrid &&
        searchResults.items &&
        searchResults.items.length > 0 && (
          <SearchResultGrid results={searchResults} />
        )}
    </div>
  );
};
export default SearchBar;
