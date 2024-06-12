const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const errorHandler = require("./errorHandler")
const db = require("./db");
db();
const PORT = process.env.PORT || 5001;
const { login, signUp } = require("./routes/user");
const validateToken = require("./tokenVerify");

app.post("/signup", signUp);
app.post("/login", login);

app.get("/",validateToken,(req,res)=>{

})


app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
