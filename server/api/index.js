const express = require("express");

const apiRouter = express.Router();
const { newActivity, register } = require("../db");

// const client = require("../db/client");

apiRouter.use("*", async (req, res, next) => {
  console.log("Api Router got hit");
  next();
});

apiRouter.post("/register", async (req, res, next) => {
  console.log(req.body);
  const data = await register(req.body);
  if (data) {
    res.send("Registeration Successful");
  } else {
    res.send("Registration Failed");
  }
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

apiRouter.post("/login", async (req, res, next) => {
  console.log("Login Route got hit");
  next();
});

module.exports = apiRouter;
