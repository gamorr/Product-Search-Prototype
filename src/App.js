// App.js
import React from "react";
import SearchBar from "./components/SearchBar";
import ShoppingList from "./components/ShoppingList";
import {
  searchBarStyle,
  shoppingListContainerStyle,
} from "./components/styles";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <p
          style={{
            fontSize: "23px",
            fontWeight: "bold",
            height: "20px",
            color: "black",
            textAlign: "center",
          }}
        >
          Product Search
        </p>
        <div data-testid="search-bar">
          <SearchBar style={searchBarStyle} />
        </div>
      </div>
      <div style={shoppingListContainerStyle}>
        <ShoppingList />
      </div>
    </div>
  );
}

export default App;
