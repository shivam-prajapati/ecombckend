const mongoose = require("mongoose");

const Cart = new mongoose.Schema({
  mail: String,
  itemId: String,
  name: String,
  description: String,
  price: Number,
});

module.exports = mongoose.model("Cart", Cart);
