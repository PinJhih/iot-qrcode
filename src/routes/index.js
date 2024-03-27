const express = require("express");
const router = express.Router();

const users = require("../models/users");
const activities = require("../models/activities");

router.get("/", async (req, res) => {
  const userID = req.session.userID;
  const username = await users.getName(userID);
  const activityList = await activities.getActivities(userID);

  res.locals.username = username;
  res.render("home", {
    title: "Welcome to my Project!",
    activities: activityList,
  });
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/register", async (req, res) => {
  res.render("register");
});

module.exports = router;
