import React from "react";

const SearchInput = ({ value, onChange, onFocus, onBlur }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{ height: "20px", padding: "8px", fontSize: "16px" }}
      placeholder="Search ..."
    />
  );
};

export default SearchInput;
