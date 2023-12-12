import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers
import SearchResultGrid from "./SearchResultGrid";

// Example data for testing
const mockResults = {
  items: [
    { id: "1", name: "Product 1", price: "$10" },
    { id: "2", name: "Product 2", price: "$20" },
    // Add more items as needed
  ],
};

test("renders SearchResultGrid with no results", () => {
  const { getByText } = render(<SearchResultGrid results={{ items: [] }} />);

  // Check if "No results found" message is rendered
  expect(getByText("No results found")).toBeInTheDocument();
});

test("renders SearchResultGrid with images", () => {
  const resultsWithImages = {
    items: [
      { id: "1", name: "Product 1", price: "$10", cover_image: "image1.jpg" },
      { id: "2", name: "Product 2", price: "$20", cover_image: "image2.jpg" },
    ],
  };

  const { getByAltText } = render(
    <SearchResultGrid results={resultsWithImages} />
  );

  // Check if images are rendered with correct alt text
  resultsWithImages.items.forEach((item) => {
    const altText = `${item.name} Image`;
    expect(getByAltText(altText)).toBeInTheDocument();
  });
});
