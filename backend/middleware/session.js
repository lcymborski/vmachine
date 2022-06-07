const redis = require('redis-mock');
const expressSession = require('express-session');
const { v4: uuid4 } = require('uuid');
const config = require('../config');
const logger = require('../lib/logger');
const errors = require('../lib/errors');
const sessionLib = require('../lib/session');

const RedisStore = require('connect-redis')(expressSession);
let redisClient = redis.createClient();

const genid = (req) => {
  const uid = uuid4();
  if (req.session && req.session.userid) {
    return `u:${req.session.userid}:${uid}`;
  }
  return `u:0:${uid}`;
};

const getClientIp = req => {
  const ip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '')
    .split(',')[0] || req.client.remoteAddress;
  if (ip === '::ffff:127.0.0.1' || ip === '::1') {
    return '127.0.0.1';
  }
  return ip;
};

const getSessionMiddleware = () =>
  expressSession({
    store: new RedisStore({
      client: redisClient,
      prefix: sessionLib.config.prefix,
    }),
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    genid,
    name: sessionLib.config.name,
    cookie: {
      ...sessionLib.config.cookie,
    },
  });

const sessionRefreshTime = 60 * 1000;
const sessionCheckMiddleware = (req, res, next) => {
  if (!req.session) {
    console.log('No session');
  }
  if (req.session) {
    const ip = getClientIp(req);
    // destroy session when different IP
    if (req.session.ip && req.session.ip !== ip) {
      return sessionLib.destroy()
        .then(() => next())
        .catch((err) => {
          logger.error(JSON.stringify({ message: err.message, stack: err.stack }));
          return next(new errors.AppError('Internal error.', 500));
        });
    } else {
      // store IP for future comparisons
      if (!req.session.ip) {
        req.session.ip = ip;
      }
    }
  }
  next();
};

module.exports = [
  getSessionMiddleware(),
  sessionCheckMiddleware,
];
