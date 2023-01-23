const express =require('express')
const {isAuthenticatedUser,autherizeRole}=require('../Middleware/Auth')
const { getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    singleProduct,createProductReview, getSingleProductReviews, deleteReview} = require('../Controllers/ProductController')
   
const router =express.Router()

router.route('/Products')
.get(getAllProduct)

router.route('/product/new').post(isAuthenticatedUser,autherizeRole('admin'),createProduct)
router.route('/Product/:id').put(isAuthenticatedUser,autherizeRole('admin'),updateProduct).delete(isAuthenticatedUser,autherizeRole('admin'),deleteProduct).get(singleProduct)
router.route('/Product/review').post(isAuthenticatedUser,createProductReview)
router.route('/reviews').get(getSingleProductReviews).delete(isAuthenticatedUser,autherizeRole("admin"),deleteReview)


module.exports=router