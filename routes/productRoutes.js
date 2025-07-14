const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create one or multiple products
router.post('/', productController.createProduct);
// Get all products for a user by email
router.get('/', productController.getProductsByEmail);
// Get all products (no filter)
router.get('/all', productController.getAllProducts);
// Get a single product by id
router.get('/:id', productController.getProductById);
// Delete a product by id and email
router.delete('/', productController.deleteProduct);

module.exports = router; 