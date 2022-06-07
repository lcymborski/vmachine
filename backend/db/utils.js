const config = require('../config');

const getPrefixed = (table) => `${config.db.tablePrefix}${table}`;

module.exports = {
  getPrefixed,
};
