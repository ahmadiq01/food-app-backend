const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  oldPrice: {
    type: Number
  },
  img: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema); 