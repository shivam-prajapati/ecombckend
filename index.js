const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const errorHandler = require("./middleware/errorHandler");
const db = require("./db");

const PORT = process.env.PORT || 5001;
const validateToken = require("./middleware/tokenVerify");
const logger = require("./middleware/logger");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

db();
app.use(cors(corsOptions));
app.use(logger);
app.use("/user", require("./routes/user"));
app.use("/item", require("./routes/item"));
app.use("/cart", validateToken, require("./routes/cart"));

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
