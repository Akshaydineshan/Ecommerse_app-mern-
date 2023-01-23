const express =require('express')
const router =express.Router()
const {createUser, loginUser,logoutUser, forgotPassword, resetPassword, userDetails, updatePassword, updateProfile, getAllUser, getSingleUser, changeUserRole, deleteUser }=require('../Controllers/UserController')
const {isAuthenticatedUser,autherizeRole}=require('../Middleware/Auth')



router.route('/registration').post(createUser)

router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/me').get(isAuthenticatedUser,userDetails)
router.route('/password/reset/:token').put(resetPassword)
router.route('/me').get(isAuthenticatedUser,userDetails)
router.route('/me/update').put(isAuthenticatedUser,updatePassword)
router.route('/me/update/profile').put(isAuthenticatedUser,updateProfile)
router.route('/admin/users').get(isAuthenticatedUser,autherizeRole('admin'),getAllUser)

router.route('/admin/user/:id')
.get(isAuthenticatedUser,autherizeRole('admin'),getSingleUser)
.put(isAuthenticatedUser,autherizeRole('admin'),changeUserRole)
.delete(isAuthenticatedUser,autherizeRole('admin'),deleteUser)

module.exports=router