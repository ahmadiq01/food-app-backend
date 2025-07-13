require('dotenv').config();

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');

// Signup
exports.signup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashedPassword });
    await user.save();
    // Generate JWT token after successful signup
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Signin
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Google and Meta OAuth placeholders
exports.oauthCallback = async (req, res) => {
  // This is a placeholder. You will need to implement OAuth logic using passport.js or similar.
  return res.status(501).json({ message: 'OAuth not implemented. Please use passport.js for Google/Meta login.' });
};

// Create a new product (drink) for a user by email
exports.createProduct = async (req, res) => {
  const { email, name, price, oldPrice, img } = req.body;
  if (!email || !name || !price) {
    return res.status(400).json({ message: 'Email, name, and price are required' });
  }
  try {
    const product = new Product({ email, name, price, oldPrice, img });
    await product.save();
    return res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all products for a user by email
exports.getProductsByEmail = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  try {
    const products = await Product.find({ email });
    return res.json({ products });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a product by product id and email
exports.deleteProduct = async (req, res) => {
  const { email, productId } = req.body;
  if (!email || !productId) {
    return res.status(400).json({ message: 'Email and productId are required' });
  }
  try {
    const deleted = await Product.findOneAndDelete({ _id: productId, email });
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found or not owned by this email' });
    }
    return res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
