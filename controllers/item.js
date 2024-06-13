const asyncHandler = require("express-async-handler");
const Item = require("../models/item");

const getItems = asyncHandler(async (req, res) => {
  console.log("inside get all Items");
  const allItems = await Item.find();
  res.status(200).json(allItems);
});

const getItemById = asyncHandler(async (req, res) => {
  console.log("inside get Item by id");
  const _id = req.params.id;
  const item = await Item.find({ _id });
  res.status(200).json(item);
});

const updateItem = asyncHandler(async (req, res) => {
  console.log("inside update Item");
  const _id = req.params.id;
  const item = req.body;
  const { acknowledged, modifiedCount } = await Item.updateOne({ _id }, item);
  console.log(modifiedCount);
  if (!acknowledged) {
    res.status(500);
    throw new Error(`update on id ${_id} was UNSUCCESSFUL `);
  }
  let msg=`update on id ${_id} was SUCCESSFUL `;
  if (modifiedCount !== 1) {
    msg= `nothing to update on id ${_id} `
  }
  res.status(200).json({ msg });
});

const deleteItem = asyncHandler(async (req, res) => {
  console.log("inside Delete Item");
  const _id = req.params.id;
  // const item = req.body;
  const { acknowledged, deletedCount } = await Item.deleteOne({ _id });
  //item deleted is of type { acknowledged: true, deletedCount: 1 }
  //   console.log(itemDeleted)
  if (!acknowledged || deletedCount == 0) {
    res.status(500);
    throw new Error(`Delete on id ${_id} was UNSUCCESSFUL `);
  }
  res.status(200).json({ msg: `Delete on id ${_id} was SUCCESSFUL ` });
});

const insertItem = asyncHandler(async (req, res) => {
  console.log("inside insert Item");
  const item = req.body;
  const itemInserted = await Item.create(item);
  //itemInserted is object that is inserted inside the Db
  //   console.log(itemInserted)
  if (!itemInserted) {
    res.status(500);
    throw new Error(`insert was UNSUCCESSFULL `);
  }
  res
    .status(200)
    .json({ msg: `insert with id ${itemInserted._id} SUCCESSFULL` });
});
const insertManyItem = asyncHandler(async (req, res) => {
  console.log("inside insert Many Item");
  const items = req.body;

  const itemsInserted = await Item.insertMany(items);
  //itemsInserted is a mongoose Array object with the items
  //being the inserted entries.
  if (itemsInserted.length !== items.length) {
    res.status(500);
    throw new Error(`Insert of many Items was UNSUCCESSFUL`);
  }
  // console.log(itemsInserted)
  res
    .status(200)
    .json({ msg: `INSERT of ${itemsInserted.length} SUCCESSFUL ` });
});
module.exports = {
  insertItem,
  getItemById,
  getItems,
  updateItem,
  deleteItem,
  insertManyItem,
};
