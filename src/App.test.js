import React from "react";
import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import App from "./App";

jest.mock("./App.css", () => ({
  __esModule: true,
  default: "mocked-css-content",
}));

test("app renders correctly", () => {
  render(<App />);

  // Check if the heading "Product Search" is present
  const headingElement = screen.getByText("Product Search");
  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toHaveStyle({
    fontSize: "24px",
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  });

  // Check if the SearchBar component is present
  const searchBarElement = screen.getByTestId("search-bar");
  expect(searchBarElement).toBeInTheDocument();
  expect(searchBarElement).toHaveStyle({
    position: "absolute",
    top: "60px",
    left: "320px",
  });
});

// Additional test for CSS mock content
test("CSS content is mocked", () => {
  // Import the CSS module to check its mocked content
  const cssContent = require("./App.css");

  // Check if the default export is the mocked content
  expect(cssContent).toBe("mocked-css-content");
});
