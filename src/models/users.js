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

async function addUser(name, password) {
  let addUserQuery = `INSERT INTO user (name, password)
    VALUES ('${name}', '${password}');`;
  db.query(addUserQuery);
}

module.exports = { get, addUser };
