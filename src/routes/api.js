const express = require("express");
const router = express.Router();
const httpError = require("http-errors");

const users = require("../models/users");

router.post("/user/:name/", async (req, res, next) => {
  let username = req.params.name;
  try {
    await users.addUser(username);
    res.send("OK!");
  } catch (err) {
    next(httpError(500, "Cannot add user."));
  }
});

module.exports = router;
