const errorHandler = (err, req, res, next) => {
  console.log("inside error Handler",err);
  res.status(400).json({ msg: err.message, stk: err.stack });
  //   console.log(err);
};

module.exports = errorHandler;
