const express = require("express");
const router = express.Router();
const httpError = require("http-errors");

const users = require("../models/users");
const activities = require("../models/activities");

router.post("/login", async (req, res, next) => {
  let body = req.body;
  let user = body.user;
  let password = body.password;

  if (users.login(user, password)) {
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

router.post("/user", async (req, res, next) => {
  let body = req.body;
  let name = body.name;
  let password = body.password;
  try {
    await users.addUser(name, password);
    res.send("OK!");
  } catch (err) {
    next(httpError(500, `Error: Cannot add user.\n${err}`));
  }
});

router.post("/activity/:name", async (req, res, next) => {
  let name = req.params.name;
  let host = req.locals.userID;
  try {
    await activities.createActivity(name, host);
    res.send("OK!");
  } catch (err) {
    next(httpError(500, `Error: Cannot create Activity.\n${err}`));
  }
});

module.exports = router;
