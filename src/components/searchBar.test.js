import React from "react";
import { toBeInTheDocument } from "@testing-library/jest-dom"; // Add this import
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/user-event";
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
  const dropdown = screen.queryByRole("listbox"); // Assuming DropdownMenu uses a listbox role

  expect(dropdown).not.toBeInTheDocument(); // Initially hidden
  console.log(searchInput);
  fireEvent.change(searchInput, { target: { value: "apple" } });

  expect(dropdown).toBeInTheDocument(); // Now visible
});
