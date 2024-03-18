const express = require("express");
const router = express.Router();

const users = require("../models/users");

router.get("/", async (req, res) => {
  const user = await users.get();
  res.locals.username = user.name;
  res.render("index", { title: "Welcome to my Project!" });
});

module.exports = router;
