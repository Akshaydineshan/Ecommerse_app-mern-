const express =require("express")
const { createOrder, getSingleOrder, getAllOrders, getAdminAllOrders, updateAdminOrder, deleteOrder } = require("../Controllers/OrderController")
const { isAuthenticatedUser, autherizeRole } = require("../Middleware/Auth")
const router =express.Router()



router.route('/order/new').post(isAuthenticatedUser,createOrder)
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder)
router.route('/orders/me').get(isAuthenticatedUser,getAllOrders)
router.route('/admin/orders').get(isAuthenticatedUser,autherizeRole("admin"),getAdminAllOrders)

router.route('/admin/order/:id')
.put(isAuthenticatedUser,autherizeRole("admin"),updateAdminOrder)
.delete(isAuthenticatedUser,autherizeRole("admin"),deleteOrder)




module.exports=router