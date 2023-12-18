import React from "react";
import SearchBar from "./SearchBar";
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("SearchBar Component", () => {
  it("renders SearchBar component without errors", () => {
    render(<SearchBar />);
  });

  it("updates search input on user input", () => {
    render(<SearchBar />);
    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "apple" } });

    expect(inputElement.value).toBe("apple");
  });

  it("displays suggestions dropdown on input", async () => {
    render(<SearchBar />);
    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "banana" } });

    await waitFor(() => {
      expect(screen.getByTestId("dropdown-menu")).toBeInTheDocument();
    });
  });

  it("triggers search on submit button click", async () => {
    render(<SearchBar />);
    const inputElement = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(inputElement, { target: { value: "orange" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Add assertions for the expected behavior after search is triggered
      // For example, you can check if loading state is displayed or search results are rendered
      // You can use screen queries to assert on the UI elements
    });
  });
});
