const {
  deleteItem,
  insertItem,
  getItemById,
  getItems,
  updateItem,
  insertManyItem
} = require("../controllers/item");
const express = require("express");
const router = express.Router();

router.get("/:id", getItemById);
router.get("/", getItems);
router.post("/many",insertManyItem)
router.post("/", insertItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
module.exports = router;
