import React, { useState } from "react";

const searchBar = () => {};
const [searchInput, setSearchInput] = useState("");

const handleChange = (e) => {
  e.preventDefault();
  setSearchInput(e.target.value);
};

// if (searchInput.length > 0) {
// }

return (
  <div>
    <input
      type="search"
      placeholder="Search here"
      onChange={handleChange}
      value={searchInput}
    />
  </div>
);
