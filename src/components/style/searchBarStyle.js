// ... (previous code)

export const styles = {
  suggestionsContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    width: "100%",
  },

  outlinedBox: {
    border: "1px solid #000",
    padding: 20,
    marginBottom: 10,
  },

  suggestionsList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },

  suggestionItem: {
    cursor: "pointer",
    padding: "5px 10px",
    marginBottom: 5,
    border: "1px solid #000",
    borderRadius: 4,
  },

  dropdownMenu: {
    position: "absolute",
    top: "5px",
    left: 0,
    zIndex: 1,
    width: "100%",
    maxHeight: 150,
    overflowY: "auto",
    border: "1px solid #000",
    borderRadius: 4,
    background: "#fff",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    padding: 10,
    boxSizing: "border-box",
    display: "none",
  },

  dropdownVisible: {
    display: "block",
  },
};
