// DropdownMenu.js
import React from "react";

// const DropdownMenu = ({ suggestionsQ, onSelectSuggestion, style }) => {
//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: "70%",
//         left: 0,
//         width: "100%",
//         background: "black",
//         boxShadow: "0, 2px 5px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       {suggestionsQ.map((suggestion, index) => (
//         <div
//           key={index}
//           onClick={() => onSelectSuggestion(suggestion)}
//           style={{
//             padding: "8px",
//             cursor: "pointer",
//             borderBottom: "1px solid #ccc",
//           }}
//         >
//           {suggestion}
//         </div>
//       ))}
//     </div>
//   );
// };
const DropdownMenu = ({ suggestionsQ, onSelectSuggestion, style }) => {
  return (
    <div style={{ ...style, borderRadius: "8px" }}>
      {suggestionsQ.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => onSelectSuggestion(suggestion)}
          style={{
            padding: "8px",
            cursor: "pointer",
            borderRadius: "8px 8px 0 0",
            background: "white",
            text: "white",
            width: "100%",
          }}
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
};
export default DropdownMenu;
