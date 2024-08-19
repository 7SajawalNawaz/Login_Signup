

const { login, signup } = require('../Controller/AuthController');
const { loginValidation, signupValidation } = require('../Middlewares/AuthValidation');

const router=require('express').Router()

router.post('/login' , loginValidation , login )
router.post('/signup' , signupValidation , signup )

module.exports=router;