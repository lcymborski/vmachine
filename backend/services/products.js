const knex = require('../db/knex');
const errors = require('../lib/errors');
const { isSeller } = require('../lib/auth');
const common = require('./common');
const { getUser } = require('./users');

const table = common.tables.products;
const columns = common.columns.base.products;

const getProducts = () => knex(table).select(columns);

const getProduct = async (id) => {
  const product = await getProducts().where(columns.id, id).first();
  // product existence check
  if (!product) {
    throw new errors.NotFoundError('Product not found.');
  }
  return product;
};

const getProductByName = (name) =>
  knex(table).select(columns).where(columns.productName, name).first();

const getSeller = async (userId) => {
  const user = await getUser(userId);
  // seller check
  if (!isSeller(user.role)) {
    throw new errors.ForbiddenError('Only seller can perform this operation.');
  }
  return user;
};

const checkNameAvailability = async (productName, excludedId = 0) => {
  const existingProduct = await getProductByName(productName);
  if (existingProduct && existingProduct.id !== excludedId) {
    throw new errors.ValidationError(
      [
        {
          path: ['productName'],
          message: 'Product name already in use.',
        },
      ],
      []
    );
  }
  return true;
};

const createProduct = async (userId, { productName, amountAvailable, cost }) => {
  const user = await getSeller(userId);
  // check product name
  await checkNameAvailability(productName);
  const ids = await knex(table).insert({
    name: productName,
    amount: amountAvailable,
    cost,
    seller_id: userId,
  });
  return { id: ids[0], productName, amountAvailable, cost, sellerId: userId };
};

const updateProduct = async (userId, { id, productName, amountAvailable, cost }) => {
  const user = await getSeller(userId);
  // check product name
  await checkNameAvailability(productName, id);
  const product = await getProduct(id);
  // author check
  if (product.sellerId != userId) {
    throw new errors.ForbiddenError();
  }
  await knex(table)
    .update({ name: productName, amount: amountAvailable, cost })
    .where(columns.id, id);
  return { id, productName, amountAvailable, cost, sellerId: userId };
};

const deleteProduct = async (userId, id) => {
  const user = await getSeller(userId);
  const product = await getProduct(id);
  // author check
  if (product.sellerId != userId) {
    throw new errors.ForbiddenError();
  }
  await knex(table).where(columns.id, id).del();
  return product;
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
