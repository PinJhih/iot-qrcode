const session = require("express-session");

module.exports = session({
  secret: "mySecret",
  saveUninitialized: false,
  resave: true,
});
