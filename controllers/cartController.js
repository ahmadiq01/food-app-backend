const Cart = require('../models/Cart');

// Create one or multiple cart items
exports.createCartItem = async (req, res) => {
  let items = req.body.items;
  // If not an array, treat as single item
  if (!Array.isArray(items)) {
    items = [req.body];
  }
  // Validate all items
  for (const item of items) {
    if (!item.email || !item.name || !item.price) {
      return res.status(400).json({ message: 'Each cart item must have email, name, and price' });
    }
  }
  try {
    const createdItems = await Cart.insertMany(items);
    return res.status(201).json({ message: 'Cart items added successfully', items: createdItems });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all cart items for a user by email
exports.getCartByEmail = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  try {
    const cartItems = await Cart.find({ email });
    return res.json({ cartItems });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 