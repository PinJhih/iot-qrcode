const db = require("../utils/database");
const bcrypt = require("bcrypt");

async function getName(id) {
  let sql = `SELECT * FROM user WHERE id = '${id}'`;
  let user = await db.query(sql);
  let name = user[0].name;
  return name;
}

async function addUser(name, password) {
  const hash = bcrypt.hashSync(password, 10);
  let sql = `INSERT INTO user (name, password) VALUES ('${name}', '${hash}');`;
  db.query(sql);
}

async function login(name, password) {
  let sql = `SELECT * FROM user WHERE name = '${name}'`;
  let res = await db.query(sql);
  if (res.length == 0) {
    return undefined;
  }

  let user = res[0];
  if (bcrypt.compareSync(password, user.password)) {
    return user.id;
  } else {
    return undefined;
  }
}

userKeys = new Map();

function generateRandomKey(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

function set(userID) {
  let key = generateRandomKey(6);
  userKeys.set(key, userID);
  return key;
}

function get(key) {
  return userKeys.get(key);
}

module.exports = { getName, addUser, login, set, get };
