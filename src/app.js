const express = require("express");
const path = require("path");
const httpError = require("http-errors");

const logger = require("morgan");
const cookieParser = require("cookie-parser");
const staticFiles = express.static(path.join(__dirname, "../public"));
const auth = require("./utils/auth");

// create instances of routers
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

// create instance of express APP
const app = express();

// set views
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// bind middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);

// static files
app.use("/public", staticFiles);

// bind routers
app.use("/api", apiRouter);
app.use("/", indexRouter);

// not found error handler
app.use(function (_, _, next) {
  next(httpError(404, "Not found"));
});

// http error handler
app.use(function (err, _, res, _) {
  res.locals.status = err.status || 500;
  res.locals.message = err.message || "Internal error";
  res.locals.error = res.app.get("env") === "development" ? err.stack : "";

  res.status(res.locals.status);
  res.render("error");
});

module.exports = app;
