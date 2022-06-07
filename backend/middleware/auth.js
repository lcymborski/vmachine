const errors = require('../lib/errors');

// middleware for routes that require auth
const auth = (req, res, next) => {
  if (req.session && req.session.userid) {
    return next();
  }
  next(new errors.UnauthorizedError());
};

module.exports = auth;
