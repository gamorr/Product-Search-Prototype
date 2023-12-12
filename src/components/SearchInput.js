import React from "react";

const SearchInput = ({ value, onChange, onFocus, onBlur }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default SearchInput;
