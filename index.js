const express = require("express");
const server = express();

const path = require("path");
const { PORT = 4000 } = process.env;

server.use("/", express.static(path.join(__dirname, "build")));

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.js"));
});

server.listen(PORT, () => console.log(`Starting on port: ${PORT}`));
