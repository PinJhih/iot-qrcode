const db = require("../utils/database");

async function getName(id) {
  let sql = `SELECT * FROM user WHERE id = '${id}'`;
  let user = await db.query(sql);
  let name = user[0].name;
  return name;
}

async function addUser(name, password) {
  let sql = `INSERT INTO user (name, password) VALUES ('${name}', '${password}');`;
  db.query(sql);
}

async function login(name, password) {
  let sql = `SELECT * FROM user WHERE name = '${name}'`;
  let res = await db.query(sql);
  if (res.length == 0) {
    return undefined;
  }

  let user = res[0];
  if (password == user.password) {
    return user.id;
  } else {
    return undefined;
  }
}

module.exports = { getName, addUser, login };
