// styles.js

export const searchBarStyle = {
  position: "absolute",
  top: "60px",
  left: "60px",
  width: "100%",
  maxWidth: "300px",
  margin: "auto",
};

// DropdownMenu (component)
export const dropDownListStyle = {
  position: "absolute",
  top: "100%", //position dropdown below search input
  width: "95%", //makes dropdown fill the width of the search input
  backgroundColor: "white", //set background color
  boxShadow: "0 2px 5px rgba(0, 0, 0, 1.8)", //apply shadow for depth
  borderRadius: "68px", //apply rounded corners for aesthetics
  zIndex: 1,
};

// "Submit" (button)
export const submitButtonStyle = {
  position: "absolute",
  left: "230px",
  backgroundColor: "#DC143C", //sets the background color to red
  fontWeight: "bold",
  color: "white", //sets the text color to white
  border: "none", //removes the border for a cleaner appearance
  padding: "11px 15px", //for better aesthetics
  borderRadius: "9px", //rounded corners
  borderBlockEnd: "9px",
  marginRight: "1px",
  cursor: "pointer", //cursor to pointer for better user feedback
};

// "Create List" (button)
export const createListButtonStyle = {
  position: "fixed",
  fontSize: "11px",
  fontWeight: "bold",
  border: "none",
  width: "81px",
  color: "white",
  top: "10px",
  right: "10px",
  padding: "10px", // Adjust padding as needed
  borderRadius: "9px", //rounded corners
  cursor: "pointer", //cursor to pointer for better user feedback
  background: "#DC143C", // Adjust background color as needed
};

// "My List" (button)
export const myListsButtonStyle = {
  position: "fixed",
  border: "none",
  color: "white",
  fontSize: "11px",
  fontWeight: "bold",
  width: "75px",
  top: "52px",
  right: "13px",
  padding: "10px", // Adjust padding as needed
  borderRadius: "9px", //rounded corners
  borderBlockEnd: "9px",
  cursor: "pointer", //cursor to pointer for better user feedback
  background: "#DC143C", // Adjust background color as needed
};
// "View Items" (button)
export const viewItemsButtonStyle = {
  position: "fixed",
  border: "none",
  color: "white",
  fontSize: "11px",
  fontWeight: "bold",
  width: "75px",
  top: "150px",
  right: "13px",
  padding: "10px", // Adjust padding as needed
  borderRadius: "9px", //rounded corners
  borderBlockEnd: "9px",
  cursor: "pointer", //cursor to pointer for better user feedback
  background: "#DC143C", // Adjust background color as needed
};

// "Get Shopping Lists" (button)
export const getShoppingListsButtonStyle = {
  position: "fixed",
  border: "none",
  color: "white",
  fontSize: "11px",
  fontWeight: "bold",
  width: "75px",
  top: "195px",
  right: "13px",
  padding: "10px", // Adjust padding as needed
  borderRadius: "9px", //rounded corners
  cursor: "pointer", //cursor to pointer for better user feedback
  background: "#DC143C", // Adjust background color as needed
};

// "+" (button)
export const addItemButtonStyle = {
  position: "fixed",
  border: "none",
  color: "white",
  fontSize: "19px",
  fontWeight: "bold",
  top: "94px",
  right: "35px",
  padding: "6px 12px", // Adjust padding as needed
  borderRadius: "29px", //rounded corners
  background: "#DC143C",
  cursor: "pointer", //cursor to pointer for better user feedback
};
// Shopping List Details (div)
export const shoppingListDetailsContainerStyle = {
  position: "absolute",
  height: "680px",
  width: "450px",
  top: "90px",
  left: "-24px",
  padding: "11px 20px", // Adjust padding as needed
  border: "2px solid black",
  borderRadius: "9px", //rounded corners
};

// "My Cart" (<p></p>)
export const shoppingListNameStyle = {
  position: "absolute",
  color: "white",
  bottom: "644px",
  right: "190px",
  fontWeight: "bold",
  fontSize: "13px",
  background: "#DC143C",
  padding: "11px 7px",
  border: "3px",
  borderRadius: "9px", //rounded corners
};

// "Total Items: " (<p></p>)
export const shoppingListItemsStyle = {
  position: "absolute",
  right: "10px",
  color: "white",
  bottom: "60px",
  fontWeight: "bold",
  fontSize: "12px",
  marginBottom: "5px",
  background: "#DC143C",
  padding: "11px 7px",
  border: "3px",
  borderRadius: "9px", //rounded corners
};

// "Total Amount: $0.00" (<p></p>)
export const shoppingListTotalStyle = {
  position: "absolute",
  top: "640px",
  right: "10px",
  color: "white",
  fontSize: "12px",
  fontWeight: "bold",
  background: "#DC143C",
  padding: "11px 7px",
  border: "3px",
  borderRadius: "9px", //rounded corners
};

// Notes: "Test adding items here" (<p></p>)
export const shoppingListNoteStyle = {
  position: "absolute",
  top: "35px",
  left: "170px",
  color: "black",
  fontWeight: "bold",
  fontSize: "13px",
};
