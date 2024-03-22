const express = require("express");
const router = express.Router();

const users = require("../models/users");

router.get("/", async (req, res) => {
  const userID = req.locals.userID;
  const username = await users.getName(userID);
  res.locals.username = username;
  res.render("index", { title: "Welcome to my Project!" });
});

module.exports = router;
