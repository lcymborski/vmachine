const joi = require('joi');
const vmService = require('../services/vm');
const { getApiRouteHandler } = require('../lib/routing');

const depositSchema = joi.object({
  value: joi.number().integer().allow(5, 10, 20, 50, 100).only(),
});

const buySchema = joi.object({
  productId: joi.number().integer().positive().required(),
  quantity: joi.number().integer().positive().required(),
});

/**
 * @swagger
 *
 * /deposit:
 *   post:
 *     summary: Adds coin to deposit
 *     tags:
 *       - machine
 *     requestBody:
 *       required: true
 *       description: A JSON object coin value.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DepositBody'
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       403:
 *         description: Only buyer can perform this operation.
 */

const deposit = getApiRouteHandler((req, res, next) => {
  const { value } = req.valid;
  return vmService.deposit(req.session.userid, value);
}, depositSchema);

/**
 * @swagger
 *
 * /buy:
 *   post:
 *     summary: Buys a product
 *     tags:
 *       - machine
 *     requestBody:
 *       required: true
 *       description: A JSON object with product ID and quantity.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BuyBody'
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BuyResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       403:
 *         description: Only buyer can perform this operation.
 */

const buy = getApiRouteHandler((req, res, next) => {
  const { productId, quantity } = req.valid;
  return vmService.buy(req.session.userid, productId, quantity);
}, buySchema);

/**
 * @swagger
 *
 * /reset:
 *   post:
 *     summary: Resets user's deposit
 *     tags:
 *       - machine
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       403:
 *         description: Only buyer can perform this operation.
 */

const reset = getApiRouteHandler((req, res, next) => {
  return vmService.reset(req.session.userid);
});

module.exports = {
  deposit,
  buy,
  reset,
};
