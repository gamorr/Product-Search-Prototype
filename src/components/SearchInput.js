import React from "react";
import { searchInputStyle } from "./styles";
const SearchInput = ({ value, onChange, onFocus, onBlur }) => {
  return (
    <input
      className="search-input"
      type="text"
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      style={searchInputStyle}
      placeholder="Search ..."
    />
  );
};

export default SearchInput;
