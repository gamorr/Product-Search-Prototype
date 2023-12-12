import React from "react";
const DropdownMenu = ({
  suggestionsQ,
  suggestionsVariants,
  onSelectSuggestion,
  style,
}) => {
  return (
    <div style={{ ...style, borderRadius: "8px" }}>
      {suggestionsQ.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => onSelectSuggestion(suggestion)}
          style={{
            padding: "5px",
            cursor: "pointer",
            borderRadius: "8px 8px 0 0",
            background: "white",
            text: "white",
            width: "100%",
          }}
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
};
export default DropdownMenu;
