const bcrypt = require('bcryptjs');

const hashPassword = (password) => bcrypt.hashSync(password, 8);

const checkPassword = (password, hash) => bcrypt.compare(password, hash);

const isSeller = (role) => role === 1;

const isBuyer = (role) => role === 2;

module.exports = {
  hashPassword,
  checkPassword,
  isSeller,
  isBuyer,
};
