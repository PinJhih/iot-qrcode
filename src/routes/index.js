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

router.get("/joined", async (req, res) => {
  const userID = req.session.userID;
  const username = await users.getName(userID);
  const joinedActivityList = await activities.getJoinedActivity(userID);

  res.locals.username = username;
  res.render("joined", {
    title: "My joined activities",
    joined: joinedActivityList,
  });
});

router.get("/activity", async (req, res) => {
  res.render("activity");
});

router.get("/participants/:id", async (req, res) => {
  let id = req.params.id;
  let participants = await activities.getParticipants(id);
  console.log(participants);
  res.render("participants", {
    participants: participants
  });
});

module.exports = router;
