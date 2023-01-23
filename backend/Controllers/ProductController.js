const Product = require('../Models/Product')
const ErrorHandler = require('../utils/errorhandler')
const CatchAsyncError=require('../Middleware/CatchAsyncError')
const features =require('../utils/Features')




exports.getAllProduct = async (req, res, next) => {
  console.log("reach")
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
  console.log("1")
 
  
        const product = await Product.create(req.body)
        
        res.status(200).json({
            success: true,
            product,
            message:"product added successfully"
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
    console.log(product)

    if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }
      res.status(200).json({
        success: true,
        product,
        // productCount
      });




})

//create and update review
exports.createProductReview = async (req, res, next) => {
  // console.log("id",req.user.id)
  // console.log("_ID",req.user._id)
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    console.log(isReviewed)
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
      message:"addded your review"
      
    });
  };

  //review

  exports.getSingleProductReviews=async(req,res,next)=>{
    
    let product = await Product.findById(req.query.id)
    if(!product){

    }

    res.json({
      success:true,
      message:"get all reviews of product",
      review:product.reviews
    })
  }

  // Delete Review --Admin
exports.deleteReview = async (req, res, next) => {
  

  const product = await Product.findById(req.query.productId);

  if (!product) {

    return next(new ErrorHandler("Product not found with this id", 404));
  }

  const reviews = product.reviews.filter(

    (rev) => rev._id.toString() !== req.query.id.toString()
  );
 
  console.log("reviews",reviews)

  let avg = 0;

  reviews.forEach((rev) => {
   
   
    avg += rev.rating;

  });

  let ratings = 0;
  

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    console.log("avg",avg)
  
   
    ratings = avg / reviews.length;
  }


  const numOfReviews = reviews.length;
  console.log(numOfReviews)
  console.log(reviews)
  console.log(ratings)

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
       ratings,
      numOfReviews,
    },
    {
      new: true,
    
    }
  );

  res.status(200).json({
    success: true,
    message:"delete success"
  });
};

