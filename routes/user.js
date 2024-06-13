const {signUp,login,getAllUser,forgetPass} = require("../controllers/user")
const express = require("express")
const router = express.Router();

router.get("/",getAllUser);
router.post("/signup",signUp);
router.post("/login",login);
router.post("/forgetpass",forgetPass);
module.exports = router;
