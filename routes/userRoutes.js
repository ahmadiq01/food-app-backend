const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Signup
router.post('/signup', userController.signup);

// Signin
router.post('/signin', userController.signin);

// OAuth (Google/Meta) placeholders
router.get('/oauth/:provider/callback', userController.oauthCallback);

// Product (Drink) APIs
router.post('/product', userController.createProduct);
router.get('/products', userController.getProductsByEmail);
router.delete('/product', userController.deleteProduct);

module.exports = router;
