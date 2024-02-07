const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = 3001;

// Use CORS middleware
app.use(cors());
app.use(express.json());

// Proxy route
app.post("/1/shopping_lists", async (req, res) => {
  try {
    const { query } = req;
    const { token, app_key, name, note } = query;

    if (!app_key) {
      return res.status(400).json({ error: "app_key is required" });
    }

    // Forward the request to Freshop API
    const freshopResponse = await fetch(
      `https://api.freshop.com/1/shopping_lists?${new URLSearchParams(query)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          app_key,
          name,
          note,
        }),
      }
    );

    // Send the response back to the client
    const freshopData = await freshopResponse.json();
    res.json(freshopData);
  } catch (error) {
    console.error("Error proxying request:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
