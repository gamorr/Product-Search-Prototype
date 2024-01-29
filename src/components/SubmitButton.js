import React from "react";

const SubmitButton = ({ onClick, style }) => {
  return (
    <button
      onClick={onClick}
      className="submit-button"
      style={{
        backgroundColor: "#DC143C", //sets the background color to red
        color: "white", //sets the text color to white
        border: "none", //removes the border for a cleaner appearance
        padding: "11px 15px", //for better aesthetics
        borderRadius: "9px", //rounded corners
        borderBlockEnd: "9px",
        marginRight: "1px",
        cursor: "pointer", //cursor to pointer for better user feedback
        ...style, //allows additional styles to be passed in via the style prop
      }}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
