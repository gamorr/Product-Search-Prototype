// styles.js

export const searchBarStyle = {
  position: "relative",
  bottom: "10px",
  right: "110px",
  width: "160px",
  margin: "auto",
};

// DropdownMenu (component)
export const dropDownListStyle = {
  position: "absolute",
  top: "100%", //position dropdown below search input
  right: "82px",
  width: "195px", //makes dropdown fill the width of the search input
  boxShadow: "0 2px 5px rgba(0, 0, 0, 1.8)", //apply shadow for depth
  border: "1px solid grey",
  borderRadius: "9px", //apply rounded corners for aesthetics
  zIndex: 1,
};

export const searchInputStyle = {
  position: "relative",
  height: "18px",
  width: "190px",
  right: "70px",
  padding: "9px",
  fontSize: "16px",
  borderRadius: "9px",
  border: "1px solid grey",
};

// "Submit" (button)
export const submitButtonStyle = {
  position: "absolute",
  left: "134px",
  bottom: "1px",
  backgroundColor: "#DC143C", //sets the background color to red
  fontWeight: "bold",
  color: "white", //sets the text color to white
  border: "none", //removes the border for a cleaner appearance
  padding: "11px 15px", //for better aesthetics
  borderRadius: "9px", //rounded corners
  borderBlockEnd: "9px",
  marginRight: "1px",
  boxShadow: "1px 2px 5px rgba(0, 1, 0, 100.8)", //apply shadow for depth
  cursor: "pointer", //cursor to pointer for better user feedback
};

// // "+" (button)
// export const addItemButtonStyle = {
//   position: "fixed",
//   border: "none",
//   color: "white",
//   fontSize: "19px",
//   fontWeight: "bold",
//   top: "94px",
//   right: "30px",
//   padding: "6px 12px", // Adjust padding as needed
//   borderRadius: "29px", //rounded corners
//   background: "#DC143C",
//   cursor: "pointer", //cursor to pointer for better user feedback
// };

// "Cart" (button)
export const viewItemsButtonStyle = {
  position: "relative",
  bottom: "95px",
  width: "95px",
  left: "240px",
  border: "none",
  borderRadius: "20px", //rounded corners
  borderBlockEnd: "9px",
  color: "white",
  background: "#DC143C", // Adjust background color as needed
  boxShadow: "1px 1px 5px rgba(0, 1, 0, 5.8)", //apply shadow for depth
  fontSize: "13px",
  fontWeight: "bold",
  padding: "16px", // Adjust padding as needed
  cursor: "pointer", //cursor to pointer for better user feedback
};

// "New List +" (button)
export const createListButtonStyle = {
  position: "relative",
  fontSize: "11px",
  fontWeight: "bold",
  border: "none",
  width: "55px",
  color: "white",
  top: "-31px",
  left: "315px",
  boxShadow: "1px 2px 5px rgba(0, 1, 0, 5.8)", //apply shadow for depth
  padding: "11px", // Adjust padding as needed
  borderRadius: "80px", //rounded corners
  cursor: "pointer", //cursor to pointer for better user feedback
  background: "#DC143C", // Adjust background color as needed
};

// "Add to cart" (button)
export const addToCartButtonStyle = {
  position: "absolute",
  border: "none",
  color: "white",
  fontSize: "8px",
  fontWeight: "bold",
  width: "40px",
  top: "125px",
  right: "3.6px",
  overflow: "hidden",
  padding: "9px 6px", // Adjust padding as needed
  borderRadius: "15px", //rounded corners
  boxShadow: "1px 2px 5px rgba(0, 1, 0, 5.8)", //apply shadow for depth
  background: "#DC143C",
  cursor: "pointer", //cursor to pointer for better user feedback
};

export const deleteItemButtonStyle = {
  position: "relative",
  top: "99px",
  left: "107px",
  background: "#DC143C",
  border: "none",
  color: "white",
  padding: "8px 5px",
  borderRadius: "29px",
  boxShadow: "1px 1px 5px rgba(0, 1, 0, 5.8)", //apply shadow for depth
  fontSize: "10px",
  cursor: "pointer",
};

export const searcResultsContainerStyle = {
  position: "absolute",
  height: "60px",
  width: "100px",
  top: "30px",
  right: "125px",
  padding: "11px 20px", // Adjust padding as needed
  borderRadius: "9px", //rounded corners
  display: "grid",
  gridTemplateColumns: "repeat(2, calc(250px - 87px))",
  gap: "10px",
};

export const shoppingListItemsStyle = {
  position: "absolute",
  height: "60px",
  width: "100px",
  top: "80px",
  left: "10px",
  padding: "11px 20px", // Adjust padding as needed
  borderRadius: "9px", //rounded corners
  display: "grid",
  gridTemplateColumns: "repeat(2, calc(250px - 85px))",
  gap: "6px",
};
// "My Cart" (Shopping List name) (<p></p>)
export const shoppingListNameStyle = {
  position: "absolute",
  color: "white",
  bottom: "644px",
  right: "230px",
  fontWeight: "bold",
  fontSize: "13px",
  background: "#DC143C",
  padding: "11px 7px",
  border: "3px",
  boxShadow: "1px 1px 5px rgba(0, 1, 0, 5.8)", //apply shadow for depth
  borderRadius: "9px", //rounded corners
};

// Notes: "Test adding items here" (<p></p>)
export const shoppingListNoteStyle = {
  position: "absolute",
  top: "35px",
  left: "190px",
  color: "black",
  fontWeight: "bold",
  fontSize: "13px",
};

// Notes: "Test adding items here" (<p></p>)
export const emptyShoppingListStyle = {
  position: "relative",
  top: "35px",
  left: "60px",
  width: "1230px",
  color: "black",
  overflow: "hidden",
  fontWeight: "bold",
  fontSize: "16px",
};

// // "My List" (button)
// export const myListsButtonStyle = {
//   position: "fixed",
//   border: "none",
//   color: "white",
//   fontSize: "11px",
//   fontWeight: "bold",
//   width: "75px",
//   top: "52px",
//   right: "13px",
//   padding: "10px", // Adjust padding as needed
//   borderRadius: "9px", //rounded corners
//   borderBlockEnd: "9px",
//   cursor: "pointer", //cursor to pointer for better user feedback
//   background: "#DC143C", // Adjust background color as needed
// };

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

// Shopping List Details (div)
export const shoppingListDetailsContainerStyle = {
  position: "absolute",
  height: "680px",
  width: "500px",
  top: "70px",
  left: "-100px",
  padding: "11px 20px", // Adjust padding as needed
  border: "1px solid grey",
  boxShadow: "1px 2px 5px rgba(0, 1, 0, 5.8)", //apply shadow for depth
  borderRadius: "9px", //rounded corners
};

// "Total Items: " (<p></p>)
export const shoppingListTotalItemsStyle = {
  position: "absolute",
  right: "10px",
  color: "white",
  bottom: "60px",
  fontWeight: "bold",
  boxShadow: "1px 1px 5px rgba(0, 1, 0, 5.8)", //apply shadow for depth
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
  boxShadow: "1px 1px 5px rgba(0, 1, 0, 5.8)", //apply shadow for depth
  fontSize: "12px",
  fontWeight: "bold",
  background: "#DC143C",
  padding: "11px 7px",
  border: "3px",
  borderRadius: "9px", //rounded corners
};
