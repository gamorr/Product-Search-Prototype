import React, { useRef, useEffect } from "react";

//DropdownMenu component receives props: suggestionsQ, onSelectsuggestion, style
const DropdownMenu = ({
  suggestionsQ,
  onSelectSuggestion,
  style,
  toggleMenu,
}) => {
  const dropdownRef = useRef(null);

  // Function to handle clicks outside the dropdown menu
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Click occurred outside the dropdown menu, so close it
      toggleMenu(false);
    }
  };

  // Attach click event listener to the document body
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); // Empty dependency array to run the effect only once when the component mounts

  //define the base style for each suggestion
  const suggestionStyle = {
    padding: "5px",
    cursor: "pointer",
    borderRadius: "8px 8px 0 0",
    background: "white",
    color: "black",
    width: "100%",
  };
  //render the dropdown menu
  return (
    <div style={{ ...style, borderRadius: "8px" }}>
      {suggestionsQ.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => onSelectSuggestion(suggestion)}
          style={suggestionStyle}
          //add onMouseOver and onMouseOut event handlers to handle highlighting
          onMouseOver={(e) => (e.target.style.background = "#e0e0e0")}
          onMouseOut={(e) => (e.target.style.background = "white")}
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
