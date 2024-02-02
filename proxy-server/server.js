const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = 5001;
// Enable CORS middleware
app.use(cors());
// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.post("/1/shopping_lists", async (req, res) => {
  try {
    const { app_key, name, note } = req.body;
    const response = await axios.post(
      "https://api.freshop.com/1/shopping_lists",
      {
        app_key,
        name,
        note,
      }
    );

    // Return a successful response to the client
    res.status(200).json({ message: "Shopping list created successfully" });
  } catch (error) {
    console.error("Error creating shopping list:", error);
    console.log("Server response:", error.response);
    // Handle the error and send an appropriate response to the client
    res.status(500).json({ error: "Error creating shopping list" });
  }
});

const apiProxy = createProxyMiddleware("/api", {
  target: "https://api.freshop.com",
  changeOrigin: true,
  // pathRewrite: {
  //   "^/api": "", // Remove the '/api' prefix when forwarding the request
  // },
  onProxyReq: (proxyReq, req, res) => {
    // Remove headers that may cause conflicts
    // if (proxyReq.headers) {
    delete proxyReq.headers["connection"];
    // }
  },
});

app.use(apiProxy);

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
