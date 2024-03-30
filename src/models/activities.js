const db = require("../utils/database");

async function getActivities(userID) {
  let sql = `SELECT * FROM activity WHERE host = ${userID}`;
  let activities = await db.query(sql);
  return activities;
}

async function createActivity(name, host) {
  let sql = `INSERT INTO activity (name, host)
    VALUES ('${name}', ${host})`;
  await db.query(sql);
}

async function deleteActivity(activityID) {
  let sql = `DELETE FROM activity
    WHERE id = ${activityID}`;
  await db.query(sql);
}

async function joinActivity(activityID, userID) {
  let sql = `INSERT INTO participant (activity_id, user_id)
    VALUES ('${activityID}', ${userID})`;
  await db.query(sql);
}

async function exitActivity(activityID, userID) {
  let sql = `DELETE FROM participant
    WHERE activity_id=${activityID} AND user_id=${userID}`;
  await db.query(sql);
}

async function getJoinedActivity(userID) {
  let sql = `SELECT * FROM activity INNER JOIN participant
    ON activity.id = participant.activity_id
    WHERE participant.user_id = ${userID}`;
  let activities = await db.query(sql);
  await activities;
}

module.exports = {
  getActivities,
  createActivity,
  deleteActivity,
  joinActivity,
  exitActivity,
  getJoinedActivity,
};
