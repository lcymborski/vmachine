const supertest = require('supertest');
const utils = require('./utils');
const app = require('../app');

const request = supertest(app);

beforeAll(utils.setup);
afterAll(utils.teardown);

it('returns only when id exists', async () => {
  const cookies = await utils.getCookies(request, 'seller1', 'test1234');
  const response = await request.get('/api/products/100000').set('Cookie', [...cookies]);
  expect(response.status).toBe(404);
});

it('returns a product', async () => {
  const cookies = await utils.getCookies(request, 'seller1', 'test1234');
  const response = await request
    .get(`/api/products/${utils.shared.product11.id}`)
    .set('Cookie', [...cookies]);
  expect(response.status).toBe(200);
  expect(response.body.productName).toBe(utils.shared.product11.productName);
});

it('returns a list of products', async () => {
  const cookies = await utils.getCookies(request, 'seller1', 'test1234');
  const response = await request.get('/api/products').set('Cookie', [...cookies]);
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(4);
});

it('allows only sellers to add products', async () => {
  const cookies = await utils.getCookies(request, 'buyer1', 'test1234');
  const response = await request
    .post('/api/products')
    .set('Cookie', [...cookies])
    .send({ productName: 'TestProduct', amountAvailable: 2, cost: 20 });
  expect(response.status).toBe(403);
  expect(response.body.message).toBe('Only seller can perform this operation.');
});

it('adds a product', async () => {
  const cookies = await utils.getCookies(request, 'seller1', 'test1234');
  const response = await request
    .post('/api/products')
    .set('Cookie', [...cookies])
    .send({ productName: 'TestProduct', amountAvailable: 2, cost: 20 });
  expect(response.status).toBe(200);
  expect(response.body.productName).toBe('TestProduct');
});

it('updates a product', async () => {
  const cookies = await utils.getCookies(request, 'seller1', 'test1234');
  const response = await request
    .put(`/api/products/${utils.shared.product11.id}`)
    .set('Cookie', [...cookies])
    .send({ productName: 'product11', amountAvailable: 2, cost: 20 });
  expect(response.status).toBe(200);
  expect(response.body.amountAvailable).toBe(2);
});

it('deletes a product', async () => {
  const cookies = await utils.getCookies(request, 'seller1', 'test1234');
  const response = await request
    .delete(`/api/products/${utils.shared.product11.id}`)
    .set('Cookie', [...cookies]);
  const response2 = await request
    .get(`/api/products/${utils.shared.product11.id}`)
    .set('Cookie', [...cookies]);
  expect(response.status).toBe(200);
  expect(response2.status).toBe(404);
});
