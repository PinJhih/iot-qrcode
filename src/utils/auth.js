function auth(req, res, next) {
  if (req.locals == undefined) {
    req.locals = {};
  }

  // TODO: session-cookie
  req.locals.userID = 1;
  next();
}

module.exports = auth;
