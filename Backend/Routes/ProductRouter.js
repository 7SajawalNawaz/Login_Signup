const ensureAuthenticated = require('../Middlewares/Auth');

const router=require('express').Router()

router.get('/' ,ensureAuthenticated, (req,res)=>{
    res.status(200).json([
        {
            name:"Iphone",
            price:100000
        },
        {
            name:"TV",
            price:30000
        }
    ])
})
module.exports=router;