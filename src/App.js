import React from "react";
import logo from "./__mocks__/logo.svg";
import "./App.css";
import SearchBar from "./components/searchBar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <SearchBar />
        <p>Skunkworks Product Search</p>
      </header>
    </div>
  );
}

export default App;
