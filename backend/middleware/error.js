const logger = require('../lib/logger');
const errors = require('../lib/errors');

// error handler
// wyswietlenie informacji o bledzie (szczegoly tylko na srodowisku deweloperskim)
const error = ((err, req, res, next) => {
  const status = err.status || 500;
  const env = process.env.NODE_ENV || 'development';
  const isDev = (env === 'development');
  const data = {
    // message: (isDev || status !== 500) ? err.message : 'Internal error.',
    message: err.message,
    error: isDev ? err : {},
  };
  if (err instanceof errors.ValidationError) {
    data.fieldErrors = err.fieldErrors;
    data.nonFieldErrors = err.nonFieldErrors;
  }
  if (status === 500) {
    // logger.error(err.message, { stack: err.stack });
    logger.error(JSON.stringify({ message: err.message, stack: err.stack }));
  }
  if (err instanceof errors.TooManyRequestsError && err.retryAfter) {
    res.set('Retry-After', String(err.retryAfter));
  }
  res.status(status).json(data);
});

module.exports = error;
