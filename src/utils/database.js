const sqlite3 = require("sqlite3").verbose();
const file = __dirname + "/../../ntcu-iot.db";

function connect() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(file, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      resolve(db);
    });
  });
}

async function query(sql) {
  const db = await connect();
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }

      db.close((err) => {
        if (err) {
          console.error(err.message);
          reject(err);
        }
      });
      resolve(rows);
    });
  });
}

function init() {
  const createTableQuery = `CREATE TABLE IF NOT EXISTS user
    (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)`;
  query(createTableQuery);
}

init();

module.exports = {
  query,
};
