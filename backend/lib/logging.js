const winston = require('winston');
const path = require('path');
const morgan = require('morgan');
const config = require('../config');

const getFileTransport = (filename, level = 'info') => {
  const transport = new winston.transports.File({
    filename: path.join(__dirname, `/../logs/${filename}`),
    level,
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  });
  return transport;
};

const getAppLogger = (name) =>
  winston.createLogger({
    silent: process.env.NODE_ENV === 'test',
    level: config.isProduction ? 'info' : 'debug',
    defaultMeta: { service: name },
    transports: [
      new winston.transports.Console({
        handleExceptions: true,
        format: config.isProduction
          ? winston.format.combine(winston.format.timestamp(), winston.format.json())
          : winston.format.combine(
              winston.format.timestamp(),
              winston.format.prettyPrint(),
              winston.format.printf((info) => JSON.stringify(info || {}).replace(/\\n /g, '\n'))
            ),
      }),
      ...(!config.isProduction
        ? [getFileTransport(`${name}-error.log`, 'error'), getFileTransport(`${name}.log`)]
        : []),
    ],
  });

const serverLogger = getAppLogger('vm-server');

const httpLogger = winston.createLogger({
  silent: process.env.NODE_ENV === 'test',
  defaultMeta: { service: 'vm-http' },
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      format:
        config.isSzyk3 && config.isProduction
          ? winston.format.combine(winston.format.timestamp(), winston.format.json())
          : winston.format.simple(),
    }),
    ...(!(config.isSzyk3 && config.isProduction) ? [getFileTransport('vm-http.log')] : []),
  ],
});

httpLogger.stream = {
  write: function (message, encoding) {
    // use message.trim() to remove empty line between logged lines
    // https://stackoverflow.com/a/28824464/3109731
    // decolorize log messages received through stream
    // https://github.com/winstonjs/winston-mongodb/issues/62
    httpLogger.info(message.trim().replace(/\u001b\[[0-9]{1,2}m/g, ''));
  },
};

const httpLogMiddleware = morgan(
  ':remote-addr - :remote-user [:date[iso]] :method :url HTTP/:http-version :status :res[content-length]',
  { stream: httpLogger.stream }
);

module.exports = {
  serverLogger,
  httpLogMiddleware,
};
