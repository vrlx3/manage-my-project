const express = require("express");
const server = express();
const morgan = require("morgan");

const path = require("path");
const client = require("./server/db/client");
const { PORT = 4000 } = process.env;

//connecting to database
client.connect();

// body-parser & logging middleware
server.use(express.json());
server.use(morgan("tiny"));

const apiRouter = require("./server/api");

server.use("/", express.static(path.join(__dirname, "build")));

server.use("/api", apiRouter);

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.js"));
});

server.listen(PORT, () => console.log(`Starting on port: ${PORT}`));
