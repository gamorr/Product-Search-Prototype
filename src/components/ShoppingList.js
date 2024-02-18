import React, { useState, useEffect } from "react";
import {
  createListButtonStyle,
  shoppingListDetailsContainerStyle,
  myListsButtonStyle,
  shoppingListNameStyle,
  shoppingListItemsStyle,
  shoppingListTotalStyle,
  shoppingListNoteStyle,
  addItemButtonStyle,
  viewItemsButtonStyle,
  getShoppingListsButtonStyle,
} from "../components/styles";

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState({
    name: "",
    item_quantity_total: 0,
    note: "",
    item_total: 0,
    items: [],
  }); // State to hold the retrieved shopping list
  const [showListDetails, setShowListDetails] = useState(false); // State to control the visibility of shopping list details
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showItemDetails, setShowItemDetails] = useState(false);
  // State to store item details for rendering
  const [itemDetails, setItemDetails] = useState(null);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const appKey = process.env.REACT_APP_APP_KEY;
  const token = process.env.REACT_APP_TOKEN;
  const shoppingListId = process.env.REACT_APP_ID; // Replace with the actual list ID
  const store_id = process.env.REACT_APP_STORE_ID;

  const handleCreateList = async () => {
    try {
      // Use window.prompt to get user input
      const listName = window.prompt("Enter list name (recommended):");
      const listNote = window.prompt("Enter list note (recommended):");
      const url = `http://localhost:3001/1/shopping_lists?token=${token}&app_key=${appKey}&name=${encodeURIComponent(
        listName || ""
      )}&note=${encodeURIComponent(listNote || "")}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to create shopping list: ${response.status}`);
      }

      const data = await response.json();
      console.log("Shopping List Created:", data);
      // Handle the response data as needed
    } catch (error) {
      console.error("Error creating shopping list:", error.message);
      // Handle the error as needed
    }
  };

  const getShoppingList = async (shoppingListId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/1/shopping_lists/${shoppingListId}?token=${token}&app_key=${appKey}`
      );

      if (!response.ok) {
        throw new Error(`Failed to get shopping list: ${response.status}`);
      }

      const data = await response.json();
      setShoppingList(data);
    } catch (error) {
      console.error("Error getting shopping list:", error.message);
    }
  };

  const handleViewLists = async () => {
    try {
      await getShoppingList(shoppingListId);
      setShowListDetails((prevValue) => !prevValue);
      setButtonClicked(true);
    } catch (error) {
      console.error("Error getting shopping list:", error.message);
    }
  };

  const getListOfShoppingLists = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/1/shopping_lists?token=${token}&app_key=${appKey}&store_id=${store_id}`
      );

      if (!response.ok) {
        throw new Error(`Failed to get shopping lists: ${response.status}`);
      }

      const data = await response.json();
      console.log("List of Shopping Lists:", data);

      // Handle the response data as needed
    } catch (error) {
      console.error("Error getting shopping lists:", error.message);
    }
  };

  // Example: Call the getShoppingList function with a specific list ID
  useEffect(() => {
    getShoppingList(shoppingListId);
  }, [shoppingListId]); // The empty dependency array ensures this effect runs once on component mount

  // Log shoppingList only when it changes
  useEffect(() => {
    if (buttonClicked) {
      console.log("Shopping List object details", shoppingList);
    }
  }, [buttonClicked]);

  // this handles when we want to add an item to shopping list
  const handleAddItem = async () => {
    try {
      const productId = window.prompt("Enter product ID:");
      const quantity = window.prompt("Enter quantity:");

      const url = `http://localhost:3001/1/shopping_list_items?app_key=${appKey}&shopping_list_id=${shoppingListId}&product_id=${productId}&quantity=${quantity}&token=${token}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to add item to shopping list: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Shopping List Item Added:", data);
    } catch (error) {
      console.error("Error adding item to shopping list:", error.message);
      // Handle the error as needed
    }
  };

  const handleViewItems = async () => {
    try {
      const url = `http://localhost:3001/1/shopping_list_items?app_key=${appKey}&shopping_list_id=${shoppingListId}&store_id=${store_id}&token=${token}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to get shopping list items: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Shopping List Items:", data);

      setShoppingList((prevShoppingList) => ({
        ...prevShoppingList,
        items: data.items || [], // Ensure items is defined even if it's empty
      }));

      // Display the details of the first item (you can modify this logic based on your UI design)
      if (data.total > 0) {
        setItemDetails(data.items);
        setShowItemDetails(true);
      }
    } catch (error) {
      console.error("Error getting shopping list items:", error.message);
    }
  };

  return (
    <div>
      {((showListDetails && shoppingList) ||
        (showItemDetails && itemDetails)) && (
        <div style={shoppingListDetailsContainerStyle}>
          <p style={shoppingListNameStyle}>{shoppingList.name}</p>
          <p style={shoppingListItemsStyle}>
            Total Items: {shoppingList.item_quantity_total}
          </p>
          <p style={shoppingListNoteStyle}>Notes: {shoppingList.note}</p>
          <p style={shoppingListTotalStyle}>
            Total Amount: {shoppingList.item_total}
          </p>
          {/* Add more details as needed */}
        </div>
      )}

      <div>
        <button style={createListButtonStyle} onClick={handleCreateList}>
          Create List
        </button>
        <button style={myListsButtonStyle} onClick={handleViewLists}>
          My List
        </button>
        <button style={addItemButtonStyle} onClick={handleAddItem}>
          +
        </button>
        {/* Add the new button for viewing items */}
        <button style={viewItemsButtonStyle} onClick={handleViewItems}>
          My Cart
        </button>

        {/* Add the new button for getting shopping lists */}
        <button
          style={getShoppingListsButtonStyle}
          onClick={getListOfShoppingLists}
        >
          Lists
        </button>
      </div>

      {showItemDetails && itemDetails && (
        <div
          style={{
            position: "absolute",
            height: "60px",
            width: "100px",
            top: "180px",
            left: "-30px",
            padding: "11px 20px", // Adjust padding as needed
            borderRadius: "9px", //rounded corners
            display: "grid",
            gridTemplateColumns: "repeat(2, calc(250px - 85px))",
            gap: "6px",
          }}
        >
          {/* Display details for each item */}
          {itemDetails.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                width: "130px", // Set a fixed width for each item
                height: "140px", // Set a fixed height for each item
                overflow: "hidden",
                left: "20px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.8)",
                border: "1px solid black",
                borderRadius: "8px",
                padding: "10px",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "7px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  left: "10px",
                  overflow: "hidden", // Hide text that overflows
                  textOverflow: "ellipsis", // Add ellipsis for overflowed text
                }}
              >
                {item.product.name}
              </div>
              <div
                style={{
                  position: "absolute",
                  fontSize: "8px",
                  color: "darkgray",
                  bottom: "10px",
                  width: "100%",
                  height: "auto",
                  whiteSpace: "nowrap", // Prevent text from wrapping
                  overflow: "hidden", // Hide text that overflows
                  textOverflow: "ellipsis", // Add ellipsis for overflowed text
                }}
              >
                ID: {item.id}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "125px",
                  left: "7px",
                  color: "black",
                  fontSize: "8.5px",
                  fontWeight: "bold",
                  whiteSpace: "nowrap", // Prevent text from wrapping
                  overflow: "hidden", // Hide text that overflows
                  textOverflow: "ellipsis", // Add ellipsis for overflowed text
                }}
              >
                Unit Price: {item.product.price}
              </div>
              <div
                style={{
                  position: "absolute",
                  whiteSpace: "nowrap", // Prevent text from wrapping
                  top: "125px",
                  right: "5px",
                  fontSize: "9px",
                  fontWeight: "bold",
                  color: "#DC143C",
                  overflow: "hidden", // Hide text that overflows
                  textOverflow: "ellipsis", // Add ellipsis for overflowed text
                }}
              >
                Quantity: {item.quantity}
              </div>
              {/* Display cover images */}
              {item.product?.cover_image && (
                <img
                  src={`https://images.freshop.com/${item.product.cover_image}_small.png`}
                  alt={`Product ${item.product.id} - Cover Image`}
                  style={{
                    position: "absolute",
                    bottom: "50px",
                    right: "50px",
                    width: "70px", // Make the image fill the container
                  }}
                />
              )}
              {/* Add more details as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
