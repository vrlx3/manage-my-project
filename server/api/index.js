const express = require("express");
const apiRouter = express.Router();
const { newActivity } = require("../db");

// const client = require("../db/client");

apiRouter.use("*", (req, res, next) => {
  console.log("Api Router got hit");
  next();
});

apiRouter.post("/activities", async (req, res, next) => {
  console.log(req.body);
  try {
    const data = await newActivity(req.body);
    res.send(data);
  } catch (error) {
    throw error;
  }
});

// apiRouter.post("/activities", async (req, res, next) => {
//   console.log("from incoming req.body", req.body);

//   try {
//     client.connect();
//     const response = await client.query(`
//     INSERT INTO activities (activity) VALUES ('activity11')

//     `);
//     console.log(response);
//     res.send("query ran").finally(() => client.end);
//   } catch (error) {
//     res.send("query failed");
//     throw error;
//   }
// });

module.exports = apiRouter;
