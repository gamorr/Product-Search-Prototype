import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
// import { fireEvent } from "@testing-library/user-event";
import SearchBar from "./SearchBar";

test("renders SearchBar with initial state", () => {
  render(<SearchBar />);

  const searchInput = screen.getByPlaceholderText("Search ...");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  expect(searchInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(
    screen.queryByText("Error rendering search results")
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText("Error searching for suggestions")
  ).not.toBeInTheDocument();
});

test("shows dropdown when input changes", () => {
  render(<SearchBar />);

  const searchInput = screen.getByPlaceholderText("Search ...");
  fireEvent.change(searchInput, { target: { value: "apple" } });

  // Assuming DropdownMenu uses a listbox role
  const dropdown = screen.queryByRole("listbox");

  expect(dropdown).toBeInTheDocument(); // Now visible
});
