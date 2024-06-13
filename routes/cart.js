const {
    deleteCart,
    insertCart,
    getCartById,
    getCarts,
    updateCart,
    insertManyCart
  } = require("../controllers/cart");
  const express = require("express");
  const router = express.Router();
  
  router.get("/:id", getCartById);
  router.get("/", getCarts);
  router.post("/many",insertManyCart)
  router.post("/", insertCart);
  router.put("/:id", updateCart);
  router.delete("/:id", deleteCart);
  module.exports = router;
  