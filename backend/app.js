const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes/index');
const sessionMiddlewares = require('./middleware/session');
const errorHandler = require('./middleware/error');
const logging = require('./lib/logging');

const app = express();

app.disable('x-powered-by');

// http logging
app.use(logging.httpLogMiddleware);
// enable CORS
if (!config.isProduction) {
  app.use(cors({ origin: true, credentials: true }));
}
// parse JSON body
app.use(bodyParser.json());

// session handling
app.use(sessionMiddlewares);

// handle routes
routes(app);

// 404 error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler,
// detailed error info only in dev mode
app.use(errorHandler);

module.exports = app;
