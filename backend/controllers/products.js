const joi = require('joi');
const productsService = require('../services/products');
const { getApiRouteHandler } = require('../lib/routing');

const productSchema = joi.object({
  productName: joi.string().max(256).required(),
  amountAvailable: joi.number().integer().positive().required(),
  cost: joi.number().integer().positive().required(),
});

/**
 * @swagger
 *
 * /products:
 *   get:
 *     tags:
 *       - product
 *     summary: Returns all products
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

const getProducts = getApiRouteHandler((req, res, next) => {
  return productsService.getProducts();
});

/**
 * @swagger
 *
 * /products/{productId}:
 *   get:
 *     tags:
 *       - product
 *     summary: Find product by ID
 *     description: Returns a single product
 *     parameters:
 *       - name: productId
 *         in: path
 *         description: ID of product to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

const getProduct = getApiRouteHandler((req, res, next) => {
  const id = parseInt(req.params.id, 10);
  return productsService.getProduct(id);
});

/**
 * @swagger
 *
 * /products:
 *   post:
 *     summary: Adds new product
 *     tags:
 *       - product
 *     requestBody:
 *       required: true
 *       description: A JSON object containing product info.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductBody'
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */

const createProduct = getApiRouteHandler((req, res, next) => {
  const { productName, amountAvailable, cost } = req.valid;
  return productsService.createProduct(req.session.userid, {
    productName,
    amountAvailable,
    cost,
  });
}, productSchema);

/**
 * @swagger
 *
 * /products/{productId}:
 *   put:
 *     summary: Updates product data
 *     tags:
 *       - product
 *     parameters:
 *       - name: productId
 *         in: path
 *         description: ID of product to update
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       description: A JSON object containing product info.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductBody'
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       403:
 *         description: Only seller can perform this operation.
 */

const updateProduct = getApiRouteHandler((req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { productName, amountAvailable, cost } = req.valid;
  return productsService.updateProduct(req.session.userid, {
    id,
    productName,
    amountAvailable,
    cost,
  });
}, productSchema);

/**
 * @swagger
 *
 * /products/{productId}:
 *   delete:
 *     tags:
 *       - product
 *     summary: Deletes a product
 *     description: Available only to seller who owns it
 *     parameters:
 *       - name: productId
 *         in: path
 *         description: ID of product to delete
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       403:
 *         description: Not owned by seller
 *       404:
 *         description: Product not found
 */

const deleteProduct = getApiRouteHandler((req, res, next) => {
  const id = parseInt(req.params.id, 10);
  return productsService.deleteProduct(req.session.userid, id);
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
