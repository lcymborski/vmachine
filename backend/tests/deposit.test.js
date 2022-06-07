const supertest = require('supertest');
const utils = require('./utils');
const app = require('../app');

const request = supertest(app);

beforeAll(utils.setup);
afterAll(utils.teardown);

it('allows only buyers to increase deposit', async () => {
  const cookies = await utils.getCookies(request, 'seller1', 'test1234');
  const response = await request
    .post('/api/deposit')
    .set('Cookie', [...cookies])
    .send({ value: 10 });
  expect(response.status).toBe(403);
  expect(response.body.message).toBe('Only buyer can perform this operation.');
});

it('rejects invalid denominal', async () => {
  const cookies = await utils.getCookies(request, 'buyer1', 'test1234');
  const response = await request
    .post('/api/deposit')
    .set('Cookie', [...cookies])
    .send({ value: 200 });
  expect(response.status).toBe(400);
});

it('increases deposit', async () => {
  const cookies = await utils.getCookies(request, 'buyer1', 'test1234');
  const response = await request
    .post('/api/deposit')
    .set('Cookie', [...cookies])
    .send({ value: 10 });
  expect(response.status).toBe(200);
  expect(response.body.deposit).toBe(10);
});
