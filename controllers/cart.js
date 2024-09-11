const asyncHandler = require("express-async-handler");
const Cart = require("../models/cart");

const getCarts = asyncHandler(async (req, res) => {
  console.log("inside get all Carts");
  const {mail} = req.user
  const allCarts = await Cart.find({mail});
  // console.log("carts",JSON.stringify(allCarts))
  res.status(200).json(allCarts);
});

const getCartById = asyncHandler(async (req, res) => {
  console.log("inside get Cart by id");
  const {mail} = req.user
  const _id = req.params.id;
  const cart = await Cart.find({ _id ,mail});
  res.status(200).json(cart);
});

const updateCart = asyncHandler(async (req, res) => {
  console.log("inside update Cart");
  const _id = req.params.id;
  const {mail} = req.user
  const cart = req.body;
  const { acknowledged, modifiedCount } = await Cart.updateOne({ _id ,mail}, cart);
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

const deleteCart = asyncHandler(async (req, res) => {
  console.log("inside Delete Cart");
  const _id = req.params.id;
  const {mail} = req.user
  // const cart = req.body;
  const { acknowledged, deletedCount } = await Cart.deleteOne({ _id ,mail});
  //   console.log(cartDeleted)
  if (!acknowledged || deletedCount == 0) {
    res.status(500);
    throw new Error(`Delete on id ${_id} was UNSUCCESSFUL `);
  }
  res.status(200).json({ msg: `Delete on id ${_id} was SUCCESSFUL ` });
});

const insertCart = asyncHandler(async (req, res) => {
  console.log("inside insert Cart");
  const cart = req.body;
  cart.mail = req.user.mail
  const cartInserted = await Cart.create(cart);
  //cartInserted is object that is inserted inside the Db
  //   console.log(cartInserted)
  if (!cartInserted) {
    res.status(500);
    throw new Error(`insert was UNSUCCESSFULL `);
  }
  res
    .status(200)
    .json({ msg: `insert with id ${cartInserted._id} SUCCESSFULL` });
});
const insertManyCart = asyncHandler(async (req, res) => {
  console.log("inside insert Many Cart");
  const carts = req.body;
  const {mail} = req.user
  carts.forEach(element => {
    element.mail = mail
  });
  const cartsInserted = await Cart.insertMany(carts);
  //cartsInserted is a mongoose Array object with the carts
  //being the inserted entries.
  if (cartsInserted.length !== carts.length) {
    res.status(500);
    throw new Error(`Insert of many Carts was UNSUCCESSFUL`);
  }
  // console.log(cartsInserted)
  res
    .status(200)
    .json({ msg: `INSERT of ${cartsInserted.length} SUCCESSFUL ` });
});
module.exports = {
  insertCart,
  getCartById,
  getCarts,
  updateCart,
  deleteCart,
  insertManyCart,
};
