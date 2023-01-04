const express =require('express')
const router =express.Router()
const {createUser, loginUser,logoutUser, forgotPassword, resetPassword }=require('../Controllers/UserController')



router.route('/registration').post(createUser)

router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

module.exports=router