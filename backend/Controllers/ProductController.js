const Product = require('../Models/Product')
const ErrorHandler = require('../utils/errorhandler')
const CatchAsyncError=require('../Middleware/CatchAsyncError')
const features =require('../utils/Features')




exports.getAllProduct = async (req, res, next) => {
    const resultPerPage=8
    const productCount=await Product.countDocuments()
  
       const feature =new features(Product.find(),req.query).search().filter().pagination(resultPerPage)
    

         let products = await feature.query
        res.json({
            message: "success",
            products,
            productCount
        })



}


exports.createProduct =CatchAsyncError(async (req, res, next) => {
  
        const product = await Product.create(req.body)
        res.status(200).json({
            success: true,
            product
        })




})

//update
exports.updateProduct = CatchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
    } else {
        product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            success: true,
            message: "updated successfully",
            product
        })
    }



})

//deleteproduct
exports.deleteProduct = CatchAsyncError(async (req, res, next) => {
    console.log("inside fun")
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
    } else {
        product = await Product.findByIdAndRemove(req.params.id)
        res.status(200).json({
            success: true,
            message: "deleted successfully",
            product
        })
    }


})
//get single product
exports.singleProduct = CatchAsyncError(async(req, res, next) => {
  
    
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }
      res.status(200).json({
        success: true,
        product,
        productCount
      });




})

