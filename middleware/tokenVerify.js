const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const tokenVerify = asyncHandler(async (req, res, next) => {
  // console.log("its all good here , token verify");
  let token = req.headers['bearer'];
  console.log("token",token)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401);
      throw new Error("user is not defined");
    }
    req.user = decoded.user;
  });
  next();
});

module.exports = tokenVerify;
