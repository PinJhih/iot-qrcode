const express = require("express");
const router = express.Router();
const httpError = require("http-errors");

const users = require("../models/users");
const activities = require("../models/activities");

router.post("/login", async (req, res, next) => {
  let body = req.body;
  let user = body.user;
  let password = body.password;

  let userID = await users.login(user, password);
  if (userID != undefined) {
    req.session.userID = userID;
    res.redirect("/");
  } else {
    res.status(400);
    res.send("failed");
  }
});

router.get("/register", async (req, res, next) => {
  res.redirect("/register");
});

router.get("/logout", async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("[ERROR] Cannot destroy session.");
    } else {
      res.redirect("/login");
    }
  });
});

router.post("/user", async (req, res, next) => {
  let body = req.body;
  let name = body.name;
  let password = body.password;
  try {
    if (name != undefined && password != undefined) {
      await users.addUser(name, password);
      res.redirect("/login");
    } else {
      res.status(400);
      res.send("register failed");
    }
  } catch (err) {
    next(httpError(500, `Error: Cannot add user.\n${err}`));
  }
});

router.get("/joined", async (req, res, next) => {
  res.redirect("/joined");
});

router.get("/activity", async (req, res, next) => {
  res.redirect("/activity");
});

router.post("/activity/:name", async (req, res, next) => {
  let name = req.params.name;
  let host = req.session.userID;
  try {
    await activities.createActivity(name, host);
    res.redirect("/");
  } catch (err) {
    next(httpError(500, `Error: Cannot create Activity.\n${err}`));
  }
});

router.delete("/activity/delete/:id", async (req, res, next) => {
  let activityID = req.params.id;
  try {
    await activities.deleteActivity(activityID);
    res.send("OK");
    res.redirect("/");
  } catch (err) {
    next(httpError(500, `Error: Cannot delete Activity.\n${err}`));
  }
});

router.get("/activity/join/:id", async (req, res, next) => {
  let activityID = req.params.id;
  let user = req.session.userID;
  try {
    await activities.joinActivity(activityID, user);
    res.render("succeed");
  } catch (err) {
    next(httpError(500, `Error: Cannot join Activity.\n${err}`));
  }
});

router.get("/activity/exit/:id", async (req, res, next) => {
  let activityID = req.params.id;
  let user = req.session.userID;
  try {
    await activities.exitActivity(activityID, user);
    res.send("OK!");
  } catch (err) {
    next(httpError(500, `Error: Cannot exit Activity.\n${err}`));
  }
});

router.post("/activity/invite/:userKey/:actID", async (req, res, next) => {
  let key = req.params.userKey;
  let user = users.get(key);
  let activityID = req.params.actID;

  console.log(user, activityID);
  try {
    await activities.joinActivity(activityID, user);
    res.send("OK!");
  } catch (err) {
    next(httpError(500, `Error: Cannot invite user.\n${err}`));
  }
});

module.exports = router;
