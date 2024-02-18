import React from "react";
import { submitButtonStyle } from "../components/styles";

// "Submit" button component
const SubmitButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="submit-button"
      style={submitButtonStyle}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
