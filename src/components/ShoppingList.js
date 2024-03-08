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
  deleteItemButtonStyle,
  shoppingListTotalItemsStyle,
  emptyShoppingListStyle,
} from "../components/styles";

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState({}); // State to hold the retrieved shopping list
  const [allShoppingLists, setAllShoppingLists] = useState([]); // State to hold all shopping lists
  const [showListDetails, setShowListDetails] = useState(false); // State to control the visibility of shopping list details
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchActive, setSearchActive] = useState(false); // New state variable to track search status
  // State to store item details for rendering
  const [itemDetails, setItemDetails] = useState(null);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productQuantities, setProductQuantities] = useState({});

  const appKey = process.env.REACT_APP_APP_KEY;
  const token = process.env.REACT_APP_TOKEN;
  const shoppingListId = process.env.REACT_APP_ID; // Replace with the actual list ID
  const store_id = process.env.REACT_APP_STORE_ID;

  const handleSearchAPI = () => {
    // Set searchActive to true when the search is triggered
    setSearchActive(true);
  };

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
        `http://localhost:3001/1/shopping_lists/${shoppingListId}?token=${token}&app_key=${appKey}&store_id=${store_id}`
      );

      if (!response.ok) {
        throw new Error(`Failed to get shopping list: ${response.status}`);
      }

      const data = await response.json();
      // console.log("stuff: ", data); use this to debug when the Total Amount: is not what it should be
      setShoppingList(data);
    } catch (error) {
      console.error("Error getting shopping list:", error.message);
    }
  };

  const handleViewItems = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:3001/1/shopping_list_items?app_key=${appKey}&shopping_list_id=${shoppingListId}&store_id=${store_id}&token=${token}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to get shopping list items: ${response.status}`
        );
      }
      const data = await response.json();
      console.log("Shopping List Items:", data);

      setItemDetails(data.items || []); // Ensure items is defined even if it's empty
      setShoppingList((prevShoppingList) => ({
        ...prevShoppingList,
        items: data.items || [], // Ensure items is defined even if it's empty
      }));
      // setShowItemDetails(!showItemDetails);

      // Display the details of the first item (you can modify this logic based on your UI design)
      if (data.total > 0) {
        setItemDetails(data.items);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error getting shopping list items:", error.message);
    }
  };

  const handleCartButtonClick = () => {
    // Toggle the state to show/hide the cart
    setShowItemDetails(!showItemDetails);

    // If you want to load shopping list items when the cart is shown, uncomment the following lines:
    if (!searchActive) {
      handleViewItems();
    }
    getListOfShoppingLists();
  };

  const getListOfShoppingLists = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/1/shopping_lists?store_id=${store_id}&app_key=${appKey}&token=${token}&id=${shoppingListId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to get shopping lists: ${response.status}`);
      }

      const data = await response.json();
      console.log("List of Shopping Lists:", data);
      // Update the state with the retrieved shopping lists
      setAllShoppingLists(data.items || []);
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

  // 'Delete' (button) function
  const handleDeleteItem = async (itemId) => {
    try {
      const selectedQuantity = productQuantities[itemId] || 1;

      const url = `http://localhost:3001/1/shopping_list_items/${itemId}?app_key=${appKey}&token=${token}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete shopping list item: ${response.status}`
        );
      }

      console.log("Shopping List Item Deleted:", itemId);

      // Update the state to remove the deleted item from itemDetails
      setItemDetails((prevItemDetails) =>
        prevItemDetails.map((item) => {
          if (item.id === itemId) {
            // Update the quantity based on the arrows
            item.quantity = Math.max(item.quantity - selectedQuantity, 1);
          }
          return item;
        })
      );

      // Update the shopping list and view items
      await getShoppingList(shoppingListId);
      await handleViewItems();

      // Update the quantity based on the arrows
      const newQuantities = { ...productQuantities };
      newQuantities[itemId] = Math.max(
        (newQuantities[itemId] || 1) - selectedQuantity,
        1
      );
      setProductQuantities(newQuantities);
    } catch (error) {
      console.error("Error deleting shopping list item:", error.message);
      // Handle the error as needed
    }
  };

  return (
    <div>
      {((showListDetails && shoppingList) ||
        (showItemDetails && itemDetails)) && (
        <div style={shoppingListDetailsContainerStyle}>
          {showItemDetails && itemDetails && (
            <div style={shoppingListItemsStyle}>
              {itemDetails.length > 0 ? (
                // Display details for each item
                itemDetails.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      position: "relative",
                      width: "140px", // Set a fixed width for each item
                      height: "150px", // Set a fixed height for each item
                      overflow: "hidden",
                      left: "20px",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.8)",
                      border: "1px solid black",
                      borderRadius: "8px",
                      padding: "10px",
                      backgroundColor: "white",
                    }}
                  >
                    <button
                      style={deleteItemButtonStyle}
                      onClick={() => handleDeleteItem(item.id)}
                      onMouseOver={(e) =>
                        (e.target.style.background = "#bb1133")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.background = "#DC143C")
                      }
                    >
                      Delete
                    </button>

                    <div
                      style={{
                        position: "absolute",
                        top: "-1px",
                        left: "13px",
                        fontSize: "11px",
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.product.name}
                    </div>
                    {/* Quantity Picker */}
                    <div style={{ position: "relative", marginBottom: "5px" }}>
                      <button
                        onMouseOver={(e) =>
                          (e.target.style.background = "#bb1133")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.background = "#DC143C")
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          const newQuantities = { ...productQuantities };
                          newQuantities[item.id] = Math.min(
                            (newQuantities[item.id] || 1) + 1,
                            10
                          );
                          setProductQuantities(newQuantities);
                        }}
                        style={{
                          position: "relative",
                          top: "5px",
                          right: "7px",
                          overflow: "hidden",
                          fontSize: "18px",
                          cursor: "pointer",
                          color: "white",
                          backgroundColor: "#DC143C",
                          boxShadow: "1px 2px 5px rgba(0, 1, 0, 5.8)",
                          border: "none",
                          borderRadius: "9px",
                          padding: "6px 10px",
                        }}
                      >
                        &#9650; {/* Up arrow */}
                      </button>

                      <div
                        style={{
                          position: "relative",
                          right: "61px",
                          top: "8px",
                          fontWeight: "bold",
                          color: "black",
                          fontSize: "14px",
                          textAlign: "center",
                        }}
                      >
                        {productQuantities[item.id] || 1}
                      </div>

                      <button
                        onMouseOver={(e) =>
                          (e.target.style.background = "#bb1133")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.background = "#DC143C")
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          const newQuantities = { ...productQuantities };
                          newQuantities[item.id] = Math.max(
                            (newQuantities[item.id] || 1) - 1,
                            1
                          );
                          setProductQuantities(newQuantities);
                        }}
                        style={{
                          position: "relative",
                          top: "10px",
                          right: "7px",
                          overflow: "hidden",
                          fontSize: "18px",
                          cursor: "pointer",
                          color: "white",
                          backgroundColor: "#DC143C",
                          border: "none",
                          borderRadius: "9px",
                          boxShadow: "1px 2px 5px rgba(0, 1, 0, 5.8)",
                          borderRadius: "9px",
                          padding: "6px 10px",
                        }}
                      >
                        &#9660; {/* Down arrow */}
                      </button>
                    </div>
                    {/* End Quantity Picker */}
                    <div
                      style={{
                        position: "absolute",
                        fontSize: "8px",
                        color: "darkgray",
                        bottom: "3px",
                        left: "4px",
                        width: "100%",
                        height: "auto",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      ID: {item.id}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "140px",
                        left: "94px",
                        color: "black",
                        fontSize: "10px",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Price: {item.product.price}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        whiteSpace: "nowrap",
                        top: "140px",
                        right: "101px",
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: "#DC143C",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Quantity: {item.quantity}
                    </div>
                    {item.product?.cover_image && (
                      <img
                        src={`https://images.freshop.com/${item.product.cover_image}_small.png`}
                        alt={`Product ${item.product.id} - Cover Image`}
                        style={{
                          position: "absolute",
                          bottom: "46px",
                          right: "46px",
                          width: "70px",
                          height: "75px",
                          overflow: "hidden",
                        }}
                      />
                    )}
                  </div>
                ))
              ) : (
                <p style={emptyShoppingListStyle}>
                  Your Cart is Currently Empty. Please Add an Item.
                </p>
              )}
            </div>
          )}
          <p style={shoppingListNameStyle}>{shoppingList.name}</p>
          <p style={shoppingListTotalItemsStyle}>
            Total Items: {shoppingList.item_quantity_total}
          </p>
          <p style={shoppingListNoteStyle}>Notes: {shoppingList.note}</p>
          <p style={shoppingListTotalStyle}>
            Total Amount:
            {shoppingList.item_total}
          </p>
        </div>
      )}

      <div>
        <button
          style={createListButtonStyle}
          onClick={handleCreateList}
          onMouseOver={(e) => (e.target.style.background = "#bb1133")}
          onMouseOut={(e) => (e.target.style.background = "#DC143C")}
        >
          New List +
        </button>

        <button
          style={viewItemsButtonStyle}
          onClick={handleCartButtonClick}
          // handleViewItems();
          // getListOfShoppingLists();

          onMouseOver={(e) => (e.target.style.background = "#bb1133")}
          onMouseOut={(e) => (e.target.style.background = "#DC143C")}
        >
          Cart 🛒
        </button>
      </div>
    </div>
  );
};

// export { handleAddItem };
export default ShoppingList;
