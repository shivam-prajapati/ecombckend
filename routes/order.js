const asyncHandler = require("express-async-handler")

const order = asyncHandler(async (req,res)=>{
    if(req.user&&req.user.mail){

    } else{
        
    }
})

module.exports = order;