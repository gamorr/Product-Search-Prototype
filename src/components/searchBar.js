import React, { useState, useEffect, useRef } from "react";
import SearchInput from "./SearchInput";
import SubmitButton from "./SubmitButton";
import ErrorMessage from "./ErrorMessage";
import DropdownMenu from "./DropdownMenu";

//this is our SearchBar component
const SearchBar = ({ style, searchResultsStyle }) => {
  const [searchInput, updateSearchInput] = useState(""); //stores current search input
  const [suggestionsQ, setSuggestionsQ] = useState([]); //stores the suggested queries from the API
  const [suggestionsVariants, setSuggestionsVariants] = useState([]); //stores the suggested query variants from the API
  const [loading, setLoading] = useState(false); // Indicates whether a search is ongoing
  const [error, setError] = useState(null); // Stores any errors encountered during search
  const [submitClicked, setSubmitClicked] = useState(false); // Indicates whether the submit button was clicked
  const [showDropdown, setShowDropdown] = useState(false); // Indicates whether the suggestions dropdown is visible
  const [searchResults, setSearchResults] = useState(null);
  const suggestionsContainerRef = useRef(null); // Create a reference to the suggestions container element to detect clicks outside it
  // define API keys and other constants
  const appKey = process.env.REACT_APP_APP_KEY; //freshop application key
  const departmentId = process.env.REACT_APP_DEPARTMENT_ID; //Optional department ID (e.g., 'produce')
  const storeId = process.env.REACT_APP_STORE_ID; //freshop store ID
  const token = process.env.REACT_APP_TOKEN; //freshop api token
  const fields = process.env.REACT_APP_FIELDS; //fields for Search API
  const limit = process.env.REACT_APP_LIMIT; //maximum number of search results to return
  const relevance_sort = process.env.REACT_APP_RELEVANCE_SORT;
  const render_id = process.env.REACT_APP_RENDER_ID;

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
    setSuggestionsQ([]); //for q value in object
    setSuggestionsVariants([]); //for variants value in object
  };

  //handle selection of a suggested query
  const handleSelectSuggestion = async (selectedSuggestion) => {
    updateSearchInput(selectedSuggestion); //heres the search input
    setShowDropdown(false); //hide the suggestions dropdown
    setSubmitClicked(true); //trigger search
    // SearchAPI(selectedSuggestion); // Clear suggestions here if needed
    setSuggestionsQ([]);
    setSuggestionsVariants([]);
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
        setSuggestionsQ(suggestionData.q); //update the suggestions state
      } else {
        setSuggestionsQ([]); //clear suggestions if none found
      }

      if (suggestionData?.variants) {
        setSuggestionsVariants(suggestionData.variants);
      } else {
        setSuggestionsVariants([]);
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
      console.log("Entering SearchAPI");
      setLoading(true);
      setError(null);

      const url = `https://api.freshop.com/1/products?q=${query}&app_key=${appKey}&fields=${fields}&limit=${limit}&store_id=${storeId}&token=${token}`;
      const params = new URLSearchParams({
        relevance_sort,
        render_id,
      });
      const fullUrl = `${url}&${params.toString}`;

      const searchResponse = await fetch(fullUrl);

      if (!searchResponse.ok) {
        throw new Error(`Search response NOT good: ${searchResponse.status}`);
      }
      const responseBody = await searchResponse.text();
      if (!responseBody) {
        throw new Error("Empty response body");
      }
      const searchData = JSON.parse(responseBody);
      console.log("SearchAPI Response: ", searchData);
      if (searchData && searchData.items) {
        return searchData.items; // Return the items data for rendering in the component
      }
      return [];
    } catch (error) {
      console.error("Error searching for products:", error.message);
      setError("Error searching for products");
    } finally {
      setLoading(false);
    }
  };

  // ...

  //this is the debounce mechanism, do not include SearchSuggestionsAPI in [searchInput]
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchInput.length > 0 && !submitClicked) {
        SearchSuggestionsAPI(searchInput); //fetch suggestions if input is present and no submit occurred
      }
    }, 15);

    return () => clearTimeout(debounceTimer);
  }, [searchInput]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const itemsData = await SearchAPI(searchInput);
        setSearchResults(itemsData);
      } catch (error) {
        console.error("Error rendering search results:", error.message);
        setError("Error rendering search results");
      } finally {
        setLoading(false);
      }
    };

    if (submitClicked) {
      fetchData();
      setSubmitClicked(false);
      setSuggestionsQ([]);
      setSuggestionsVariants([]);
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
      } else {
        setShowDropdown(true);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [suggestionsContainerRef]);

  // ...

  // Inside the return statement
  return (
    <div style={style}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignitems: "center",
            position: "relative",
          }}
        ></div>
        <div className="dropdown-container" style={{ position: "relative" }}>
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
            style={{}} //apply margin style
          />

          {showDropdown && (
            <DropdownMenu
              suggestionsQ={suggestionsQ} //pass suggested queries
              onSelectSuggestion={handleSelectSuggestion} //pass suggested query variants
              style={{
                position: "absolute",
                top: "100%", //position dropdown below search input
                width: "100%", //makes dropdown fill the width of the search input
                backgroundColor: "white", //set background color
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", //apply shadow for depth
                borderRadius: "8px", //apply rounded corners for aesthetics
                left: "0",
                zIndex: 1000, // Ensure the menu is above other elements
              }}
            />
          )}
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      {searchResults && (
        <div
          className="search-results-container"
          style={{
            // display: "grid",
            // gridTemplateColumns: "repeat(3, 1fr)", //creates 2 columns
            // gridTemplateRows: "repeat(4, 1fr)", //creates 3 rows
            // gap: "10px",
            // justifyContent: "center",
            // marginTop: "175px",
            searchResultsStyle,
          }}
        >
          {searchResults.map((item) => (
            <div
              key={item.id}
              style={{
                border: "2px solid black",
                borderRadius: "8px",
                padding: "15px",
                position: "relative",
                backgroundColor: "white",
                width: "200px",
              }}
            >
              <div
                style={{
                  marginBottom: "8px",
                  height: "2.5",
                  overflow: "hidden",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    margin: 0,
                    padding: 0,
                    overflow: "hidden",
                  }}
                >
                  {item.name}
                </p>
              </div>
              <div style={{ marginBottom: "8px" }}>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    margin: 40,
                    padding: 0,
                  }}
                >
                  Price: {item.price}
                </p>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "15px",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <p
                  style={{
                    fontSize: item.id.length > 10 ? "11px" : "13px",
                    fontWeight: "bold",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  ID: {item.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchBar;
