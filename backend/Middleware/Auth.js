const ErrorHandler = require("../utils/ErrorHandler");
// const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User= require("../Models/User");


exports.isAuthenticatedUser = async (req,res,next) =>{
    // console.log("req",req);
    const { token } = req.cookies;
   

  if (!token) {
    return next(new ErrorHandler("Please Login for access this resource", 401));
  }

  const decodedData=jwt.verify(token,"secretkey");
  console.log(decodedData);

  req.user = await User.findById(decodedData.id);

  next();
};

exports.autherizeRole =(...role)=>{
  return (req,res,next)=>{
    if(!role.includes(req.user.role)){
      return next(new ErrorHandler("only admin can access", 401));
    }
    next()
  }
     
}