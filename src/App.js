import React from "react";
import family_fare_img from "./__mocks__/family_fare_img.webp";
import "./App.css";
import SearchResults from "./components/SearchResults";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="App">
      <img
        src={family_fare_img}
        style={{
          width: "300px",
          height: "120px",
          position: "absolute",
          top: "80px",
          left: 0,
        }}
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
        style={{
          position: "absolute",
          top: "120px", // Adjust this value to your preferred height
          left: "320px", // Adjust this value based on your layout requirements
        }}
      />
      <SearchResults results={[]} />
    </div>
  );
}

export default App;
