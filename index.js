const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
dotenv.config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const db = require("./db");
db();
const User = require("./userModel");
const PORT = process.env.PORT || 5001;

app.post(
  "/signup",
  asyncHandler(async (req, res) => {
    let { name, mail, password } = req.body;
    const isUser = await User.find({ mail: mail });
    if (isUser.length > 0) {
      console.log("inside");
      res.status(400).json({
        message: "signup failed",
        error: `user already exits with mail ${mail}`,
      });
      return;
    }
    //mail should be new
    //save
    const hashed = await bcrypt.hash(password, 10);
    console.log("pass ", hashed);
    const createdUser = await User.create({ name, mail, password: hashed });
    console.log("user created is", createdUser);
    res.status(200).json(createdUser);
  })
);

app.post(
  "/login",
  asyncHandler(async (req, res) => {
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
    console.log("inside login");
    isUser.message = "success login request";
    console.log("logged in user is " ,isUser)
    res.status(201).send(isUser);
  })
);
app.get("/", (req, res) => {
  console.log("inside the first get");
  res.send({ hi: "this is JSON" });
});

app.post("/", (req, res) => {
  res.send("hi , you sent a POST request,🤨");
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
