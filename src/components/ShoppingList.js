import React from "react";
import axios from "axios";

const ShoppingList = () => {
  const createShoppingList = async (name, note) => {
    try {
      const response = await axios.post(
        `/api/1/shopping_lists`, // Updated URL to use /api prefix
        {
          app_key: process.env.REACT_APP_APP_KEY,
          name,
          note,
        }
      );
      console.log("Request Data:", {
        app_key: process.env.REACT_APP_APP_KEY,
        name,
        note,
      });
      console.log("Response Data:", response.data);
      if (response.status === 200) {
        const shoppingList = response.data;
        console.log("Created Shopping List:", shoppingList);
        // You can handle the created shopping list as needed, update state, etc.
      }
    } catch (error) {
      console.error("Error creating shopping list:", error);
      // Handle the error, display a message, etc.
    }
  };

  const handleCreateShoppingList = async () => {
    try {
      console.log("Before creating shopping list");
      const listName = prompt("Enter shopping list name:"); // You can use any UI component to get input
      const listNote = prompt("Enter shopping list note:"); // You can use any UI component to get input

      if (!listName || !listNote) {
        console.log("Shopping list name and note are required.");
        // return;
      }

      await createShoppingList(listName, listNote);

      console.log("After creating shopping list");
    } catch (error) {
      console.error("Error in handleCreateShoppingList:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleCreateShoppingList}
        style={{
          backgroundColor: "#DC143C", // Red background color
          color: "#fff", // White text color
          padding: "11px 15px", // Padding for better appearance
          fontSize: "12px", // Font size
          borderRadius: "9px", // Rounded corners
          cursor: "pointer", // Cursor style
          marginLeft: "-23px",
          border: "none",
        }}
      >
        Create Shopping List
      </button>
    </div>
  );
};

export default ShoppingList;
