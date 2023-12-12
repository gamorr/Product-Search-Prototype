import React from "react";

const SubmitButton = ({ onClick, style }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#DC143C", //sets the background color to red
        color: "white", //sets the text color to white
        border: "none", //removes the border for a cleaner appearance
        padding: "8px 16px", //for better aesthetics
        borderRadius: "8px", //rounded corners
        cursor: "pointer", //cursor to pointer for better user feedback
        ...style, //allows additional styles to be passed in via the style prop
      }}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
