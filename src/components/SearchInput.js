import React from "react";

const SearchInput = ({ value, onChange, onFocus, onBlur }) => {
  return (
    <input
      className="search-input"
      type="text"
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{ height: "19px", padding: "7px", fontSize: "16px" }}
      placeholder="Search ..."
    />
  );
};

export default SearchInput;
