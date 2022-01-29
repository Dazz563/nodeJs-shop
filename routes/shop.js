const path = require('path');
const express = require('express');

// IMPORTING CONTROLLER
const shopController = require('../controllers/shop');

const router = express.Router();

// ROUTES
router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:id', shopController.getProductById);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);

module.exports = router;