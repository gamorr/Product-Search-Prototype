import React, { useState, useEffect, useRef } from "react";
import { styles } from "./style/searchBarStyle";
import SearchInput from "./SearchInput";
import SubmitButton from "./SubmitButton";
import ErrorMessage from "./ErrorMessage";
import SearchResults from "./SearchResults";
import DropdownMenu from "./DropdownMenu";
import SearchResultGrid from "./SearchResultGrid";

//this is our SearchBar component
const SearchBar = ({ style }) => {
  const [searchInput, updateSearchInput] = useState(""); //stores current search input
  const [suggestionsQ, updateSuggestionsQ] = useState([]); //stores the suggested queries from the API
  const [suggestionsVariants, updateSuggestionsVariants] = useState([]); //stores the suggested query variants from the API
  const [searchResults, updateSearchResults] = useState([]); //stores the search results from the API
  const [loading, setLoading] = useState(false); // Indicates whether a search is ongoing
  const [error, setError] = useState(null); // Stores any errors encountered during search
  const [submitClicked, setSubmitClicked] = useState(false); // Indicates whether the submit button was clicked
  const [showDropdown, setShowDropdown] = useState(false); // Indicates whether the suggestions dropdown is visible
  const [showResultGrid, setShowResultGrid] = useState(false); // Indicates whether the search results grid is visible
  const suggestionsContainerRef = useRef(null); // Create a reference to the suggestions container element to detect clicks outside it
  // define API keys and other constants
  const appKey = "family_fare"; //freshop application key
  const departmentId = "product"; //Optional department ID (e.g., 'produce')
  const storeId = "6373"; //freshop store ID
  const token = process.env.REACT_APP_TOKEN; //freshop api token
  const fields = "id, name, price, cover_image"; //fields for Search API
  const limit = 5; //maximum number of search results to return

  //handle changes in the search input field
  const handleChange = (e) => {
    const input = e.target.value;
    updateSearchInput(input); //update search input state
    setSubmitClicked(false); //reset submit flag
    setShowDropdown(!!input); //show the suggestions dropdown if input is present !! makes it boolean
  };

  //handle submit button click
  const handleSearchSubmit = () => {
    setSubmitClicked(true); //set submit flag
    //clear suggestions on submit for a cleaner UI
    updateSuggestionsQ([]);
    updateSuggestionsVariants([]);
    setShowResultGrid(true); //this SHOULD show the result grid
  };

  //handle selection of a suggested query
  const handleSelectSuggestion = async (selectedSuggestion) => {
    updateSearchInput(selectedSuggestion); //heres the search input
    setShowDropdown(false); //hide the suggestions dropdown
    setSubmitClicked(true); //trigger search
    // SearchAPI(selectedSuggestion); // Clear suggestions here if needed
    updateSuggestionsQ([]);
    updateSuggestionsVariants([]);
  };

  //fetch suggestions from the Freshop API
  const SearchSuggestionsAPI = async (query) => {
    try {
      setLoading(true); //indicate loading state
      setError(null); //clear any previous errors

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
        updateSuggestionsQ(suggestionData.q); //update the suggestions state
      } else {
        updateSuggestionsQ([]); //clear suggestions if none found
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
      setLoading(false); //this will clear the loading state
    }
  };

  //fetch search results from the Freshop API
  const SearchAPI = async (query) => {
    try {
      setLoading(true); //indicate loading state
      setError(null); //this clears any previous errors

      const searchResponse = await fetch(
        `https://api.freshop.com/1/products?q=${query}&app_key=${appKey}&store_id=${storeId}&token=${token}&fields=${fields}&limit=${limit}`
      );

      if (!searchResponse.ok) {
        throw new Error(`Search response NOT good: ${searchResponse.status}`);
      }

      const searchData = await searchResponse.json();

      console.log("Search API Response:", searchData);

      if (searchData && searchData.results) {
        //update the search results state
        updateSearchResults(searchData.results);
      } else {
        updateSearchResults([]); //this clears the results if there isn't anything found
      }
    } catch (error) {
      console.error("Error searching for products:", error.message);
      setError("Error searching for products");
    } finally {
      setLoading(false); //clear loading state
    }
  };

  //this is the debounc mechanism, do not include SearchSuggestionsAPI in [searchInput]
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchInput.length > 0 && !submitClicked) {
        SearchSuggestionsAPI(searchInput); //fetch suggestions if input is present and no submit occurred
      }
    }, 20);

    return () => clearTimeout(debounceTimer);
  }, [searchInput]);

  //trigger search api when submit clicked
  useEffect(() => {
    if (submitClicked) {
      SearchAPI(searchInput); //perform search when submit button is clicked
      setSubmitClicked(false); //this just resets the submit flag after using it
      //clear suggestions on submit here too
      updateSuggestionsQ([]);
      updateSuggestionsVariants([]);
    }
  }, [submitClicked, searchInput]);

  //this effect hides the dropdown menu when clicking outside of it
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (
        suggestionsContainerRef.current &&
        !suggestionsContainerRef.current.contains(e.target)
      ) {
        setShowDropdown(false); //hide dropdown if clicked outside its container
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [suggestionsContainerRef]);

  //this is where we RENDER THE SEARCH BAR COMPONENT
  return (
    <div style={style}>
      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        <SearchInput
          value={searchInput}
          onChange={handleChange}
          onFocus={() => setShowDropdown(!!searchInput)}
          onBlur={() => {
            // Delay hiding the dropdown to allow time for the suggestion click event to trigger
            setTimeout(() => setShowDropdown(false), 100);
          }}
        />

        <SubmitButton
          onClick={handleSearchSubmit} //trigger search on submit button clicked
          style={{ marginleft: "8px" }} //apply margin style
        />
      </div>

      {showDropdown && (
        <DropdownMenu
          suggestionsQ={suggestionsQ} //pass suggested queries
          suggestionsVariants={suggestionsVariants} // Pass suggested query variants
          onSelectSuggestion={handleSelectSuggestion} //pass suggested query variants
          style={{
            position: "absolute",
            top: "100%", //position dropdown below search input
            width: "100%", //makes dropdown fill the width of the search input
            background: "white", //set background color
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", //apply shadow for depth
            borderRadius: "8px", //apply rounded corners for aesthetics
          }}
        />
      )}

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
