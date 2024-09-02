const mongoose = require("mongoose");

const Order = new mongoose.Schema({
  mail: String,
  id: String,
});

module.exports = mongoose.model("Order", Order);
