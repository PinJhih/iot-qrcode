function auth(req, res, next) {
  if (req.session.userID != undefined) {
    next();
  } else if (isValidPath(req.path)) {
    next();
  } else {
    res.redirect("./login");
  }
}

function isValidPath(path) {
  return path == "/login" || path == "/api/login" || path.startsWith("/public");
}

module.exports = auth;
