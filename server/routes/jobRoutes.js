const express=require('express')
const { createJobPost, getJob, getUserPost, deletePost } = require('../controllers/Job.Controller')
const { requireSingIn } = require('../middleware/auth')

const router=express.Router()

router.post('/createjob',requireSingIn, createJobPost)
router.get('/alljob',getJob)
router.get('/getuserpost',requireSingIn,getUserPost)
router.delete('/deletepost/:id',requireSingIn,deletePost)

module.exports=router