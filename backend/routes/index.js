const auth = require('./auth');
const users = require('./users');
const products = require('./products');
const vm = require('./vm');

module.exports = (app) => {
  const root = '/api';
  app.use(root, auth);
  app.use(root, users);
  app.use(root, products);
  app.use(root, vm);
};
