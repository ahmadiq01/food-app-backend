const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Signup
router.post('/signup', userController.signup);

// Signin
router.post('/signin', userController.signin);

// OAuth (Google/Meta) placeholders
router.get('/oauth/:provider/callback', userController.oauthCallback);

module.exports = router;
