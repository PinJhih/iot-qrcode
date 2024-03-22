const express = require("express");
const router = express.Router();
const httpError = require("http-errors");

const users = require("../models/users");

router.post("/user", async (req, res, next) => {
  let body = req.body;
  let name = body.name;
  let password = body.password;
  try {
    await users.addUser(name, password);
    res.send("OK!");
  } catch (err) {
    next(httpError(500, "Cannot add user."));
  }
});

module.exports = router;
