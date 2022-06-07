const knex = require('../db/knex');
const { createUser } = require('../services/users');
const { createProduct } = require('../services/products');

let shared = {};

const setup = async () => {
  await knex.migrate.latest();
  const seller1 = await createUser({ username: 'seller1', password: 'test1234', role: 1 });
  const seller2 = await createUser({ username: 'seller2', password: 'test1234', role: 1 });
  const buyer1 = await createUser({ username: 'buyer1', password: 'test1234', role: 2 });
  const buyer2 = await createUser({ username: 'buyer2', password: 'test1234', role: 2 });
  const product11 = await createProduct(seller1.id, {
    productName: 'product11',
    amountAvailable: 1,
    cost: 20,
  });
  const product12 = await createProduct(seller1.id, {
    productName: 'product13',
    amountAvailable: 2,
    cost: 100,
  });
  const product21 = await createProduct(seller2.id, {
    productName: 'product21',
    amountAvailable: 3,
    cost: 230,
  });
  const product22 = await createProduct(seller2.id, {
    productName: 'product22',
    amountAvailable: 4,
    cost: 10,
  });
  shared.seller1 = seller1;
  shared.seller2 = seller2;
  shared.buyer1 = buyer1;
  shared.buyer2 = buyer2;
  shared.product11 = product11;
  shared.product12 = product12;
  shared.product21 = product21;
  shared.product22 = product22;
};

const teardown = async () => {
  await knex.destroy();
};

const getCookies = async (request, username, password) => {
  const response = await request.post('/api/auth/login').send({
    username,
    password,
  });
  const { header } = response;
  return header['set-cookie'];
};

module.exports = {
  setup,
  teardown,
  shared,
  getCookies,
};
