// App.js
import React from "react";
import SearchBar from "./components/SearchBar";
import handleCreateList from "./components/ShoppingList";
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
            position: "relative",
            right: "135px",
            bottom: "785px",
            fontSize: "20px",
            fontWeight: "bold",
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
    </div>
  );
}

export default App;
