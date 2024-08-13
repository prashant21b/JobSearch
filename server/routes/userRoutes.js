const express=require('express')
const { register, login, continueWithGoogle } = require('../controllers/auth')
const router=express.Router()

router.post('/singup',register)
router.post('/login',login)
router.post('/auth/google',continueWithGoogle)

module.exports=router