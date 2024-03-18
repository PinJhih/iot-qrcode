const db = require("../utils/database");

class User {
  constructor(name) {
    this.name = name;
  }
}

async function get() {
  let getUserQuery = "SELECT * FROM user LIMIT 1";
  let user = await db.query(getUserQuery);
  let name = user[0].name;
  return new User(name);
}

async function addUser(name) {
  let addUserQuery = `INSERT INTO user (name) VALUES ('${name}');`;
  db.query(addUserQuery);
}

module.exports = { get, addUser };
