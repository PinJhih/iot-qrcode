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

module.exports = { getActivities, createActivity };
