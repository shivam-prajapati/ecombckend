const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = asyncHandler(async (req, res) => {
  let { name, mail, password } = req.body;
  const isUser = await User.find({ mail: mail });
  if (isUser.length > 0) {
    console.log("inside");
    throw new Error(`user already exits with mail ${mail}`);
  }
  //mail should be new
  //save
  const hashed = await bcrypt.hash(password, 10);
  console.log("pass ", hashed);
  const createdUser = await User.create({ name, mail, password: hashed });
  console.log("user created is", createdUser);
  res.status(200).json(createdUser);
});

const login = asyncHandler(async (req, res) => {
  const { mail, password } = req.body;
  const isUser = (await User.find({ mail }))[0];
  const isOk = await bcrypt.compare(password, isUser.password);
  if (!isOk) {
    res.status(400).json({
      message: "can not login",
      error: "password or mail is wrong",
    });
    return;
  }
  const accessToken = jwt.sign(
    {
      user: {
        name: isUser.name,
        mail: isUser.mail,
        pass: isUser.password,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
  console.log("inside login");
  res.status(201).json(accessToken);
});

const getAllUser = asyncHandler(async (req, res) => {
  console.log("inside getAllUser");
  const allUsers = await User.find();
  res.status(200).json(allUsers);
});

const forgetPass = asyncHandler(async (req, res) => {
  console.log("inside forgetPass");
  const { mail, password, newPassword } = req.body;
  const isUser = (await User.find({ mail }))[0];
  const isOk = await bcrypt.compare(password, isUser.password);
  if (!isOk) {
    res.status(400).json({
      message: "can not update Password",
      error: "password/mail is wrong",
    });
    return;
  }
  const hashed = await bcrypt.hash(newPassword, 10);
  const  {modifiedCount}  = await User.updateOne({ mail }, { password: hashed });
  if (modifiedCount === 0) {
    res.status(500);
    throw new Error("NOt able to update Password currently");
  }
  res.status(200).json({ msg: `password for ${mail} is updated Successfully` });
});

module.exports = { signUp, login, getAllUser,forgetPass };
