const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Create a cart item
router.post('/', cartController.createCartItem);
router.get('/', cartController.getCartByEmail);

module.exports = router; 