const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

router.get('/products', productsController.getProducts);
router.get('/products/:id(\\d+)', productsController.getProduct);
router.post('/products', productsController.createProduct);
router.put('/products/:id(\\d+)', productsController.updateProduct);
router.delete('/products/:id(\\d+)', productsController.deleteProduct);

module.exports = router;
