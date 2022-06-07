const config = require('../config');
const { getPrefixed: t } = require('../db/utils');

const tables = {
  users: t('users'),
  products: t('products'),
};

// without password
const userColumns = {
  id: `${tables.users}.id`,
  username: `${tables.users}.username`,
  role: `${tables.users}.role`,
  deposit: `${tables.users}.deposit`,
};

const allUserColumns = {
  ...userColumns,
  password: `${tables.users}.password`,
};

const productColumns = {
  id: `${tables.products}.id`,
  productName: `${tables.products}.name`,
  amountAvailable: `${tables.products}.amount`,
  cost: `${tables.products}.cost`,
  sellerId: `${tables.products}.seller_id`,
};

module.exports = {
  tables,
  columns: {
    base: {
      users: userColumns,
      products: productColumns,
    },
    extended: {
      users: allUserColumns,
    },
  },
};
