import React, { useState } from "react";
import family_fare_img from "./__mocks__/family_fare_img.webp";
import "./App.css";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="App">
      <div>
        <img
          src={family_fare_img}
          style={{
            width: "300px",
            height: "140px",
            position: "absolute",
            top: "75px",
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
            height: "35px",
            color: "yellow",
            backgroundColor: "black",
          }}
        >
          Product Search
        </p>
        <SearchBar
          style={{
            position: "absolute",
            top: "125px",
            left: "320px",
          }}
        />
      </div>
    </div>
  );
}

export default App;
