import React, { useState } from "react";
const Grid = () => {
  // You can customize the styles of each box as needed
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const boxStyle = {
    width: "100px",
    height: "100px",
    border: "1px solid black",
    margin: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Set the height of the container to the full viewport height
  };

  //   return (
  //     <div style={containerStyle}>
  //       {[...Array(9)].map((_, index) => (
  //         <div key={index} style={boxStyle}></div>
  //       ))}
  //     </div>
  //   );
  // };
  return (
    <div style={containerStyle}>
      {searchResults.map((result, index) => (
        <div key={index} style={boxStyle}>
          {/* Render the content of each box */}
          {result.name}{" "}
          {/* Adjust this to the actual property you want to display */}
        </div>
      ))}
    </div>
  );
};
export default Grid;
