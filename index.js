const express = require("express");
const app = express();
const dotenv = require("dotenv");
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
    const { name, mail, password } = req.body;
    //mail should be new
    //save
    const createdUser = await User.create({ name, mail, password });
    console.log("user created is", createdUser);
    res.status(200).json({
      name,
      message: "got signup request",
      mail,
      password,
    });
  })
);

app.post("/login", (req, res) => {
  const { name, password } = req.body;
  res.status(201).send({ message: "got login request", name, password });
});
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
