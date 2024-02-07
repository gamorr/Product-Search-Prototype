import React, { useState } from "react";

const ShoppingList = () => {
  const [listName, setListName] = useState("");
  const [listNote, setListNote] = useState("");

  const handleCreateList = async () => {
    try {
      const appKey = process.env.REACT_APP_APP_KEY;
      const token = process.env.REACT_APP_TOKEN;

      // Construct the URL with query parameters
      const url = `http://localhost:3001/1/shopping_lists?token=${token}&app_key=${appKey}&name=${encodeURIComponent(
        listName
      )}&note=${encodeURIComponent(listNote)}`;

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

  return (
    <div>
      <h2>Create a Shopping List</h2>
      <label>
        List Name:
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
      </label>
      <br />
      <label>
        List Note:
        <input
          type="text"
          value={listNote}
          onChange={(e) => setListNote(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleCreateList}>Create List</button>
    </div>
  );
};

export default ShoppingList;
