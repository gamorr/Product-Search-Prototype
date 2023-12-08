import React from "react";
import SearchBar from "./searchBar";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("SearchBar Component", () => {
  it("renders SearchBar component without errors", () => {
    render(<SearchBar />);
  });
});
