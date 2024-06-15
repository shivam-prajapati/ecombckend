const logger = (req, res, next) => {
//   console.log("headers received req.headers", JSON.stringify(req.headers));
  next();
};

module.exports = logger;
