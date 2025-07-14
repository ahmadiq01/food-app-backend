const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false // Make productId optional
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  img: {
    type: String
  },
  shadowImg: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema); 