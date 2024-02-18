const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = 3001;

// Use CORS middleware
app.use(cors());
app.use(express.json());

// Proxy route for creating a shopping list
app.post("/1/shopping_lists", async (req, res) => {
  try {
    const { token, app_key, name, note } = req.query;

    if (!app_key || !name || !note || !token) {
      return res.status(400).json({ error: "Required parameters are missing" });
    }

    // Forward the request to Freshop API
    const freshopResponse = await fetch(
      `https://api.freshop.com/1/shopping_lists?token=${token}&app_key=${app_key}&name=${encodeURIComponent(
        name
      )}&note=${encodeURIComponent(note)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

// Proxy route for getting a list of shopping lists
app.get("/1/shopping_lists", async (req, res) => {
  try {
    const { token, app_key, store_id } = req.query;

    if (!token || !app_key || !store_id) {
      return res.status(400).json({ error: "Required parameters are missing" });
    }

    // Forward the request to Freshop API
    const freshopResponse = await fetch(
      `https://api.freshop.com/1/shopping_lists?token=${token}&app_key=${app_key}&store_id=${store_id}`
    );

    // Send the response back to the client
    const freshopData = await freshopResponse.json();
    res.json(freshopData);
  } catch (error) {
    console.error("Error proxying request:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Proxy route for getting a single shopping list
app.get("/1/shopping_lists/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { token, app_key } = req.query;

    if (!app_key) {
      return res.status(400).json({ error: "app_key is required" });
    }

    // Forward the request to Freshop API
    const freshopResponse = await fetch(
      `https://api.freshop.com/1/shopping_lists/${id}?token=${token}&app_key=${app_key}`
    );

    // Send the response back to the client
    const freshopData = await freshopResponse.json();
    res.json(freshopData);
  } catch (error) {
    console.error("Error proxying request:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Proxy route for getting shopping list items
app.get("/1/shopping_list_items", async (req, res) => {
  try {
    const { app_key, shopping_list_id, store_id, token } = req.query;

    if (!app_key || !shopping_list_id || !store_id || !token) {
      return res.status(400).json({ error: "Required parameters are missing" });
    }

    // Forward the request to Freshop API
    const freshopResponse = await fetch(
      `https://api.freshop.com/1/shopping_list_items?app_key=${app_key}&shopping_list_id=${shopping_list_id}&store_id=${store_id}&token=${token}`
    );

    // Send the response back to the client
    const freshopData = await freshopResponse.json();
    res.json(freshopData);
  } catch (error) {
    console.error("Error proxying request:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Proxy route for adding a item to a shopping list
app.post("/1/shopping_list_items", async (req, res) => {
  try {
    const { app_key, shopping_list_id, product_id, quantity, token } =
      req.query;

    if (!app_key || !shopping_list_id || !product_id || !quantity || !token) {
      return res.status(400).json({ error: "Required parameters are missing" });
    }

    // Forward the request to Freshop API
    const freshopResponse = await fetch(
      `https://api.freshop.com/1/shopping_list_items?app_key=${app_key}&shopping_list_id=${shopping_list_id}&product_id=${product_id}&quantity=${quantity}&token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
