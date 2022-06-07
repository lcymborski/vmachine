const supertest = require('supertest');
const utils = require('./utils');
const app = require('../app');

const request = supertest(app);

beforeAll(utils.setup);
afterAll(utils.teardown);

it('allows only buyers to buy products', async () => {
  const cookies = await utils.getCookies(request, 'seller1', 'test1234');
  const response = await request
    .post('/api/buy')
    .set('Cookie', [...cookies])
    .send({ productId: utils.shared.product11.id, quantity: 1 });
  expect(response.status).toBe(403);
  expect(response.body.message).toBe('Only buyer can perform this operation.');
});

it('allows to buy product only when enough money', async () => {
  const total = utils.shared.product11.cost * 2;
  const cookies = await utils.getCookies(request, 'buyer1', 'test1234');
  const response = await request
    .post('/api/buy')
    .set('Cookie', [...cookies])
    .send({ productId: utils.shared.product11.id, quantity: 1 });
  expect(response.status).toBe(400);
  expect(response.body.fieldErrors.find((f) => f.field === 'quantity').message).toBe(
    'Not enough money in the deposit.'
  );
});

it('allows to buy product only when available', async () => {
  const total = utils.shared.product11.cost * 2;
  const cookies = await utils.getCookies(request, 'buyer1', 'test1234');
  await request
    .post('/api/deposit')
    .set('Cookie', [...cookies])
    .send({ value: 100 });
  const response = await request
    .post('/api/buy')
    .set('Cookie', [...cookies])
    .send({ productId: utils.shared.product11.id, quantity: 2 });
  expect(response.status).toBe(400);
  expect(response.body.fieldErrors.find((f) => f.field === 'quantity').message).toBe(
    'Not enough in stock.'
  );
});

it('buys products and returns the change', async () => {
  const total = utils.shared.product22.cost * 2;
  const cookies = await utils.getCookies(request, 'buyer1', 'test1234');
  const { body: user } = await request
    .post('/api/deposit')
    .set('Cookie', [...cookies])
    .send({ value: 100 });
  const response = await request
    .post('/api/buy')
    .set('Cookie', [...cookies])
    .send({ productId: utils.shared.product22.id, quantity: 2 });
  expect(response.status).toBe(200);
  expect(response.body.productId).toBe(utils.shared.product22.id);
  expect(response.body.total).toBe(total);
  expect(response.body.change.reduce((prev, c) => prev + c, 0)).toBe(user.deposit - total);
});
