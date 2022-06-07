const knex = require('../db/knex');
const errors = require('../lib/errors');
const { isBuyer } = require('../lib/auth');
const common = require('./common');
const { getUser } = require('./users');
const { getProduct } = require('./products');

const usersTable = common.tables.users;
const usersColumns = common.columns.base.users;
const productsTable = common.tables.products;
const productsColumns = common.columns.base.products;

const getBuyer = async (userId) => {
  const user = await getUser(userId);
  // buyer check
  if (!isBuyer(user.role)) {
    throw new errors.ForbiddenError('Only buyer can perform this operation.');
  }
  return user;
};

const deposit = async (userId, value) => {
  const user = await getBuyer(userId);
  // save increased deposit in the db
  await knex(usersTable)
    .update({
      deposit: knex.raw('?? + ?', [usersColumns.deposit, value]),
    })
    .where(usersColumns.id, userId);
  return { ...user, deposit: user.deposit + value };
};

// greedy approach
const denominations = [5, 10, 20, 50, 100];
const getChange = (value) => {
  let change = [];
  let v = value;
  for (let i = denominations.length - 1; i >= 0; i--) {
    while (v >= denominations[i]) {
      v -= denominations[i];
      change.push(denominations[i]);
    }
  }
  return change;
};

const buy = async (userId, productId, quantity) => {
  const user = await getBuyer(userId);
  const product = await getProduct(productId);
  // product availability check
  if (product.amountAvailable < quantity) {
    throw new errors.ValidationError(
      [
        {
          path: ['quantity'],
          message: 'Not enough in stock.',
        },
      ],
      []
    );
  }
  const total = quantity * product.cost;
  if (total > user.deposit) {
    throw new errors.ValidationError(
      [
        {
          path: ['quantity'],
          message: 'Not enough money in the deposit.',
        },
      ],
      []
    );
  }
  const change = getChange(user.deposit - total);
  await knex(usersTable)
    .update({
      deposit: 0,
    })
    .where(usersColumns.id, userId);
  // reset user's deposit and decrease product's available quantity
  await knex.transaction(async (trx) => {
    await trx(usersTable)
      .update({
        deposit: 0,
      })
      .where(usersColumns.id, userId);
    await trx(productsTable)
      .update({
        amount: knex.raw('?? + ?', [productsColumns.amountAvailable, 1]),
      })
      .where(productsColumns.id, productId);
  });
  return {
    total,
    productId,
    quantity,
    change,
  };
};

const reset = async (userId) => {
  const user = await getBuyer(userId);
  await knex(usersTable)
    .update({
      deposit: 0,
    })
    .where(usersColumns.id, userId);
  return { ...user, deposit: 0 };
};

module.exports = {
  deposit,
  buy,
  reset,
};
