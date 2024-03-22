const db = require("../utils/database");

async function getName(id) {
  let getUserQuery = `SELECT * FROM user WHERE id = '${id}'`;
  let user = await db.query(getUserQuery);
  let name = user[0].name;
  return name;
}

async function addUser(name, password) {
  let addUserQuery = `INSERT INTO user (name, password)
    VALUES ('${name}', '${password}');`;
  db.query(addUserQuery);
}

module.exports = { getName, addUser };
