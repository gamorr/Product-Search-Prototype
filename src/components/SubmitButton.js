import React from "react";
import { submitButtonStyle } from "../components/styles";

// "Submit" button component
const SubmitButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="submit-button"
      style={submitButtonStyle}
      onMouseOver={(e) => (e.target.style.background = "#bb1133")}
      onMouseOut={(e) => (e.target.style.background = "#DC143C")}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
