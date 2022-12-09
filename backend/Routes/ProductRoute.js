const express =require('express')
const {isAuthenticatedUser,autherizeRole}=require('../Middleware/Auth')
const { getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    singleProduct} = require('../Controllers/ProductController')
const router =express.Router()

router.route('/Products')
.get(isAuthenticatedUser,getAllProduct)

router.route('/product/new').post(isAuthenticatedUser,autherizeRole('admin'),createProduct)
router.route('/Product/:id').put(isAuthenticatedUser,autherizeRole('admin'),updateProduct).delete(isAuthenticatedUser,autherizeRole('admin'),deleteProduct).get(singleProduct)



module.exports=router