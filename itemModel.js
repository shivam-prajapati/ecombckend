const mongoose = require("mongoose");

const Item = new mongoose.Schema({
  name: String,
  description: String,
  password: String,
});

module.exports = mongoose.model("Item", Item);
