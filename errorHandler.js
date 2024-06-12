const errorHandler = (err, req, res, next) => {
  console.log("inside error Handler");
  res.status(400).send(err);
//   console.log(err);
};

module.exports = errorHandler;
