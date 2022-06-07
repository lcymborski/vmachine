const knex = require('../db/knex');
const errors = require('../lib/errors');
const { isSeller, hashPassword, checkPassword } = require('../lib/auth');
const common = require('./common');

const table = common.tables.users;
const columns = common.columns.base.users;
const extendedColumns = common.columns.extended.users;
const productsTable = common.tables.products;
const productsColumns = common.columns.base.products;

const getUsers = () => knex(table).select(columns);

const getUser = async (id) => {
  const user = await getUsers().where(columns.id, id).first();
  // user existence check
  if (!user) {
    throw new errors.NotFoundError('User not found.');
  }
  return user;
};

const getUserByUsername = (username) =>
  knex(table).select(extendedColumns).where(columns.username, username).first();

const createUser = async ({ username, password, role }) => {
  // check username
  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    throw new errors.ValidationError(
      [
        {
          path: ['username'],
          message: 'Username already in use.',
        },
      ],
      []
    );
  }
  const ids = await knex(table).insert({
    username,
    password: hashPassword(password),
    role,
  });
  return { id: ids[0], username, role, deposit: 0 };
};

// limited to username / password change
const updateUser = async (userId, { id, username, password }) => {
  // owner check
  if (id != userId) {
    throw new errors.ForbiddenError();
  }
  // check username
  const existingUser = await getUserByUsername(username);
  if (existingUser && existingUser.id !== userId) {
    throw new errors.ValidationError(
      [
        {
          path: ['username'],
          message: 'Username already in use.',
        },
      ],
      []
    );
  }
  const user = await getUser(id);
  await knex(table)
    .update({
      username,
      ...(password ? { password: hashPassword(password) } : {}),
    })
    .where(columns.id, id);
  return { id, username, role: user.role, deposit: user.deposit };
};

const deleteUser = async (userId, id) => {
  // owner check
  if (id != userId) {
    throw new errors.ForbiddenError();
  }
  const user = await getUser(id);
  // delete user and his products (if he's a seller) in one db transaction
  await knex.transaction(async (trx) => {
    await trx(productsTable).where(productsColumns.sellerId, id).del();
    if (isSeller(user.role)) {
      await trx(table).where(columns.id, id).del();
    }
  });
  return user;
};

const checkCredentials = async (username, password) => {
  let exists = false;
  let isLoggedIn = false;
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      throw new errors.NotFoundError('User not found.');
    }
    const valid = checkPassword(password, user.password);
    const { password: hash, ...rest } = user;
    return rest;
  } catch (err) {
    if (err instanceof errors.NotFoundError || err instanceof errors.ValidationError) {
      throw new errors.ValidationError([], ['Incorrect username or password.']);
    }
    throw err;
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkCredentials,
};
