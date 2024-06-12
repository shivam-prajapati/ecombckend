const asyncHandler = require("express-async-handler");
const User = require("../userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signUp = asyncHandler(async (req, res) => {
  let { name, mail, password } = req.body;
  const isUser = await User.find({ mail: mail });
  if (isUser.length > 0) {
    console.log("inside");
    // res.status(400).json({
    //   message: "signup failed",
    //   error: `user already exits with mail ${mail}`,
    // });
    throw new Error(`user already exits with mail ${mail}`);
    // return;
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

module.exports = { login, signUp };
