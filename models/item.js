const mongoose = require("mongoose");

const Item = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

module.exports = mongoose.model("Item", Item);
