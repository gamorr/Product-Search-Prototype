import React, { useState, useEffect, useRef } from "react";
import SearchInput from "./SearchInput";
import SubmitButton from "./SubmitButton";
import ErrorMessage from "./ErrorMessage";
import DropdownMenu from "./DropdownMenu";
import ShoppingList from "./ShoppingList";

//this is our SearchBar component
const SearchBar = ({ style }) => {
  const [searchInput, updateSearchInput] = useState(""); //stores current search input
  const [suggestionsQ, setSuggestionsQ] = useState([]); //stores the suggested queries from the API
  const [suggestionsVariants, setSuggestionsVariants] = useState([]); //stores the suggested query variants from the API
  const [loading, setLoading] = useState(false); // Indicates whether a search is ongoing
  const [error, setError] = useState(null); // Stores any errors encountered during search
  const [submitClicked, setSubmitClicked] = useState(false); // Indicates whether the submit button was clicked
  const [showDropdown, setShowDropdown] = useState(false); // Indicates whether the suggestions dropdown is visible
  const [searchResults, setSearchResults] = useState(null);
  const suggestionsContainerRef = useRef(null);
  const searchInputRef = useRef(null); // Create a reference to the suggestions container element to detect clicks outside it
  // define API keys and other constants
  const appKey = process.env.REACT_APP_APP_KEY; //freshop application key
  const departmentId = process.env.REACT_APP_DEPARTMENT_ID; //Optional department ID (e.g., 'produce')
  const storeId = process.env.REACT_APP_STORE_ID; //freshop store ID
  const token = process.env.REACT_APP_TOKEN; //freshop api token
  const fields = process.env.REACT_APP_FIELDS; //fields for Search API
  const limit = process.env.REACT_APP_LIMIT; //maximum number of search results to return
  const relevance_sort = process.env.REACT_APP_RELEVANCE_SORT;
  const render_id = process.env.REACT_APP_RENDER_ID;
  const upc = process.env.REACT_APP_UPC;

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
    setSuggestionsVariants([suggestionsVariants]); //for variants value in object
  };

  //handle selection of a suggested query
  const handleSelectSuggestion = async (selectedSuggestion) => {
    updateSearchInput(selectedSuggestion); //heres the search input
    setShowDropdown(false); //hide the suggestions dropdown
    setSubmitClicked(true); //trigger search
    // SearchAPI(selectedSuggestion); // Clear suggestions here if needed
    setSuggestionsQ([]);
    setSuggestionsVariants([suggestionsVariants]);
  };

  // Example function to handle image upload
  const uploadProductImages = async (item) => {
    try {
      if (!item || !item.images) {
        throw new Error("Invalid item or item.images is undefined");
      }

      const appKey = process.env.REACT_APP_APP_KEY;
      const appSecret = process.env.REACT_APP_APP_SECRET;
      const storeId = process.env.REACT_APP_STORE_ID;
      const upc = process.env.REACT_APP_UPC; // Assuming upc is present in the item object
      const upcHasCheckDigit = process.env.REACT_APP_UPC_CHECK_DIGIT; // You may need to adjust this based on your data

      // Construct the JSON array containing image data
      const imageData = item.images.map((imageId, index) => {
        return {
          sequence: index,
          source_url: `https://images.freshop.com/${imageId}_large.png`,
        };
      });

      // Make the POST request to upload images
      const uploadResponse = await fetch(
        `https://api.freshop.com/1/product_slices/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            app_key: appKey,
            app_secret: appSecret,
            store_id: storeId,
            upc: upc,
            upc_has_check_digit: upcHasCheckDigit,
            images: imageData,
          }),
        }
      );

      if (!uploadResponse.ok) {
        throw new Error(`Image upload failed: ${uploadResponse.status}`);
      }

      const uploadData = await uploadResponse.json();
      console.log("Image Upload Response:", uploadData);
    } catch (error) {
      console.error("Error uploading product images:", error.message);
    }
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
      setLoading(loading); //this will clear the loading state
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
      const fullUrl = `${url}&${params.toString()}`;

      const searchResponse = await fetch(fullUrl);

      if (!searchResponse.ok) {
        throw new Error(`Search response NOT good: ${searchResponse.status}`);
      }

      const searchData = await searchResponse.json();
      console.log("SearchAPI Response: ", searchData);
      if (searchData && searchData.items) {
        // Ensure that images property exists and is an array
        const itemsData = searchData.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          cover_image: item.cover_image,
          // item.images && item.images.length > 0 ? item.images[0] : null,
        }));
        return itemsData;
      }

      return [];
    } catch (error) {
      console.error("Error searching for products:", error.message);
      setError("Error searching for products");
    } finally {
      setLoading(false);
    }
  };

  //this is our debounce mechanism, do not include SearchSuggestionsAPI next to [searchInput]
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchInput.length > 0 && !submitClicked) {
        //handles only changing the input not submit button
        SearchSuggestionsAPI(searchInput); //fetch suggestions if input is present and no submit occurred
      }
    }, 15);

    return () => clearTimeout(debounceTimer);
  }, [searchInput]);

  // useEffect to handle fetching data when submitClicked or searchInput changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading state to true to indicate ongoing data fetching
        setLoading(true);
        // Clear any previous errors
        setError(null);
        // Call the uploadProductImages function to upload images
        const imageUrls = ["", ""]; // Replace with the actual image URLs
        await uploadProductImages(upc, imageUrls);

        // Call the SearchAPI function to fetch search results based on the search input
        const itemsData = await SearchAPI(searchInput);
        // Set the fetched data to the searchResults state
        setSearchResults(itemsData);
      } catch (error) {
        console.error("Error rendering search results:", error.message);
        setError("Error rendering search results");
      } finally {
        // Set loading state to false to indicate the end of data fetching, regardless of success or failure
        setLoading(false);
      }
    };

    // Check if submitClicked is true, indicating that the submit button was clicked
    if (submitClicked) {
      // Call the fetchData function to initiate data fetching
      fetchData();
      // Reset submitClicked to false to prevent repeated fetching
      setSubmitClicked(false);
      // Clear suggestionsQ and suggestionsVariants to reset the suggestions state
      setSuggestionsQ([]);
      setSuggestionsVariants([]);
    }
  }, [submitClicked, searchInput]);

  //this effect hides the dropdown menu when clicking outside of it
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target) &&
        suggestionsContainerRef.current &&
        !suggestionsContainerRef.current.contains(e.target)
      ) {
        setShowDropdown(false); //hide dropdown if clicked outside its container
      } else {
        setShowDropdown(true);
      }
    };

    const handleEscKey = (e) => {
      // this is so I can get rid of the dropdown menu when pressing Esc
      if (e.key === "Escape") {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleDocumentClick); //listen for click
    document.addEventListener("keydown", handleEscKey); //Listen for the ESC key
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [suggestionsContainerRef, searchInputRef]);

  const searchInputStyle = {
    width: "100%",
    marginRight: "2px",
  };

  const submitButtonStyle = {
    marginLeft: "2px",
  };

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
          className="dropdown-container"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchInput
            value={searchInput}
            onChange={handleChange}
            onFocus={() => setShowDropdown(!!searchInput)}
            onBlur={() => {
              // Delay hiding the dropdown to allow time for the suggestion click event to trigger
              setTimeout(() => setShowDropdown(false), 100);
            }}
            style={searchInputStyle}
          />

          <SubmitButton
            onClick={handleSearchSubmit} //trigger search on submit button clicked
            style={submitButtonStyle} //apply margin style
          />

          {showDropdown && (
            <DropdownMenu
              suggestionsQ={suggestionsQ} //pass suggested queries
              onSelectSuggestion={handleSelectSuggestion} //pass suggested query variants
              style={{
                position: "absolute",
                top: "100%", //position dropdown below search input
                width: "72%", //makes dropdown fill the width of the search input
                backgroundColor: "white", //set background color
                boxShadow: "0 2px 5px rgba(0, 0, 0, 1.8)", //apply shadow for depth
                borderRadius: "68px", //apply rounded corners for aesthetics
                zIndex: 1,
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
            display: "grid",
            gridTemplateColumns: "repeat(2, calc(50% - 10px))",
            marginTop: "40px",
            marginLeft: "-30px",
            gap: "5px 15px",
          }}
        >
          {searchResults.map((item) => (
            <div
              key={item.id}
              className="search-results-item"
              style={{
                width: "150px", // Set a fixed width for each item
                height: "160px", // Set a fixed height for each item
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.8)",
                borderRadius: "8px",
                padding: "7px",
                position: "relative",
                backgroundColor: "white",
                marginBottom: "20px",
              }}
            >
              {/* Product Name */}
              <div
                style={{
                  marginBottom: "15px",
                  overflow: "hidden",
                  height: "30px",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </p>
              </div>

              {/* Product Images */}
              {item.cover_image && ( // Change here to use cover_image instead of images
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={`https://images.freshop.com/${item.cover_image}_small.png`}
                    alt={`Product Image`}
                    style={{
                      width: "70px", // this is for adjusting the image size
                      height: "fixed",
                      marginRight: "5px",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              )}

              {/* Other Details */}
              <div
                style={{
                  fontSize: "10px",
                  color: "darkgray",
                  marginBottom: "5px",
                  height: "auto",
                }}
              >
                ID: {item.id}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bolder",
                  color: "darkred",
                }}
              >
                {item.price}
              </div>
            </div>
          ))}
        </div>
      )}
      <ShoppingList /> {/* Render the ShoppingList component here */}
    </div>
  );
};
export default SearchBar;
