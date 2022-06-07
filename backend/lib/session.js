const redis = require('redis-mock');
const { promisify } = require('util');
const config = require('../config');
const logger = require('../lib/logger');
const errors = require('../lib/errors');

let redisClient = redis.createClient();
const asyncRedis = {
  del: promisify(redisClient.del).bind(redisClient),
  scan: (pattern, count) =>
    new Promise((resolve, reject) => {
      let cursor = '0';
      let keys = [];
      function scan() {
        redisClient.scan(cursor, 'MATCH', pattern, 'COUNT', count, function (err, res) {
          if (err) {
            reject(err);
          }
          cursor = res[0];
          const keysScan = res[1];
          if (keysScan.length) {
            keys = keys.concat(keysScan);
          }
          if (cursor === '0') {
            return resolve(keys);
          } else {
            return scan();
          }
        });
      }
      scan();
    }),
};

const sessionConfig = {
  name: 'vmsession',
  prefix: 'vm:',
  cookie: {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: 'lax',
    maxAge: null,
  },
};

const destroy = (req, res) => {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err !== null) {
        reject(err);
      }
      res.clearCookie(sessionConfig.name, {
        httpOnly: sessionConfig.cookie.httpOnly,
        secure: sessionConfig.cookie.secure,
      });
      resolve();
    });
  });
};

const regenerate = (req, userId) => {
  const ip = req.session.ip;
  const sessionData = {
    userid: userId,
  };
  return new Promise((resolve, reject) => {
    req.session.regenerate((err) => {
      if (err !== null) {
        reject(err);
      } else {
        if (ip) {
          req.session.ip = ip;
        }
        Object.assign(req.session, sessionData);
        resolve();
      }
    });
  });
};

const invalidate = async (req) => {
  // const userId = req.session.userid;
  const pattern = `${sessionConfig.prefix}u:0:*`;
  // find redis keys for all the user's sessions
  const keys = await asyncRedis.scan(pattern, 100);
  return keys.length ? asyncRedis.del(keys) : Promise.resolve(keys);
};

module.exports = {
  config: sessionConfig,
  destroy,
  regenerate,
  invalidate,
};
