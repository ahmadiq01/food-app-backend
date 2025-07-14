const Product = require('../models/Product');

// Create one or multiple products (drinks) for a user by email
exports.createProduct = async (req, res) => {
  let products = req.body.products;
  // If not an array, treat as single product
  if (!Array.isArray(products)) {
    products = [req.body];
  }
  // Validate all products
  for (const product of products) {
    if (!product.email || !product.name || !product.price) {
      return res.status(400).json({ message: 'Each product must have email, name, and price' });
    }
  }
  try {
    const createdProducts = await Product.insertMany(products);
    return res.status(201).json({ message: 'Products created successfully', products: createdProducts });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get a single product by id
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json({ product });
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

// Get all products (no filter)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
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