const { json } = require("body-parser")
const jwt = require("jsonwebtoken")



const ensureAuthenticated=(req,res,next) => {
const auth=req.headers['authorization']
if(!auth){
    return res.status(403)
    .json({
        message:"JWT Tokens are required"
    })
  
}
try{
        const decoded=jwt.verify(auth , process.env.JWT_SECRET)
        req.user=decoded;
        next()
}
catch(err){
    return res.status(403)
    .json({
        message:"JWT Tokens are Expired or Wrong"
    })
}
}

module.exports=ensureAuthenticated;