// import React, { useState } from "react";
// import family_fare_img from "./__mocks__/family_fare_img.webp";
// import "./App.css";
// import SearchBar from "./components/SearchBar";

// function App() {
//   const [searchResults, setSearchResults] = useState([]);
//   const handleSearch = (results) => {
//     setSearchResults(results);
//   };

//   return (
//     <div className="App">
//       <img
//         src={family_fare_img}
//         style={{
//           width: "300px",
//           height: "120px",
//           position: "absolute",
//           top: "80px",
//           left: 0,
//         }}
//         alt="Family Fare"
//       />
//       <p
//         style={{
//           fontSize: "24px",
//           fontWeight: "bold",
//           margin: "0",
//           top: "80px",
//           height: "50px",
//           color: "yellow",
//           backgroundColor: "black",
//         }}
//       >
//         Skunk Works Product Search
//       </p>
//       <SearchBar
//         style={{
//           position: "absolute",
//           top: "120px",
//           left: "320px",
//         }}
//         onSearch={handleSearch} // Pass the search handler function
//       />
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";
import family_fare_img from "./__mocks__/family_fare_img.webp";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Grid from "./components/Grid";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="App">
      <div>
        <img
          src={family_fare_img}
          style={{
            width: "300px",
            height: "120px",
            position: "absolute",
            top: "80px",
            left: 0,
          }}
          alt="Family Fare"
        />
        <p
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            margin: "0",
            top: "80px",
            height: "50px",
            color: "yellow",
            backgroundColor: "black",
          }}
        >
          Skunk Works Product Search
        </p>
        <SearchBar
          updateSearchResults={handleSearch}
          style={{
            position: "absolute",
            top: "120px",
            left: "320px",
          }}
          // onSearch={handleSearch} //search handler function
        />
        <Grid searchResults={searchResults} />
      </div>
    </div>
  );
}

export default App;
