import React from "react";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <p
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            margin: "0",
            top: "80px",
            height: "35px",
            color: "black",
            textAlign: "center",
          }}
        >
          Product Search
        </p>
        <SearchBar
          style={{
            position: "absolute",
            top: "60px",
            left: "115px",
          }}
        />
      </div>
    </div>
  );
}

export default App;
