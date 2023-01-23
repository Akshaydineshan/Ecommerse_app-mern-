

const ErrorHandler = require('../utils/errorhandler')
const CatchAsyncError = require('../Middleware/CatchAsyncError')
const User = require('../Models/User')

// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const sendToken = require("../utils/jwtToken.js");
const sendMail = require("../utils/sendMail");
const sendToken =require('../utils/jwtToken')
const crypto=require("crypto")



exports.createUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "http://facebook.com",
            url: "http//test.com"
        }
    })
    sendToken(user,201,res,"creating user account successfully")
  
   
}




exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorHandler("enter email and password", 400));
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return next(new ErrorHandler("user not found", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("massword mismatch", 400));
    }
    sendToken(user,201,res,"user login success")
  

}

exports.logoutUser = async (req, res, next) => {
    res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).status(200).json({
        success: true,
        message: "logout success"
    })
}

exports.forgotPassword = async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email })


    if (!user) {
        return next(new ErrorHandler("user not found this email", 400));
    }
    const resetToken = user.getResetToken()
    await user.save({
        validateBeforeSave: false,
    });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl}`;

    try {
        await sendMail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} succesfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTime = undefined;

        await user.save({
            validateBeforeSave: false,
        });

        return next(new ErrorHandler(error.message, 500));
    }
}


exports.resetPassword =async(req,res,next)=>{
    const resetPasswordToken =crypto.createHash("sha256").update(req.params.token).digest('hex')

    const user =await User.findOne({
        resetPasswordToken,
        resetPasswordTime:{$gt:Date.now()}
    })

    if(!user){
        return next(new ErrorHandler("reset token error or expired", 400));
    }
    if(req.body.password != req.body.confirmPassword){
        return next(new ErrorHandler("password not match confim password", 400));
    }

    user.password =req.body.password;
    user.resetPasswordToken =undefined;
    user.resetpasswordtime =undefined;
     await user.save()
     
     sendToken(user,201,res,"password reset successfully")
}

//get user details

exports.userDetails=async(req,res,next)=>{

    const user =await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        message:"get user details",
        user

    })

}

//update password

exports.updatePassword=async(req,res,next)=>{
    const user =await User.findById(req.user.id).select('+password')

    const isPasswordMatched= await user.comparePassword(req.body.oldPassword)
    if(!isPasswordMatched){
        return next(new ErrorHandler("old password in currect", 400));
    }
  
    if(req.body.newPassword != req.body.confirmPassword){
        return next(new ErrorHandler("password not match confim password", 400));
    }

    user.password =req.body.newPassword

    await user.save()
    sendToken(user,201,res,"password updated")

}

exports.updateProfile =async(req,res,next)=>{
    let updatedData={
       name:req.body.name,
       email:req.body.email
    }

    const user =await User.findByIdAndUpdate(req.user.id,updatedData,{new:true})

    sendToken(user,201,res,"profile updated")
}

//get all user 

exports.getAllUser =async(req,res,next)=>{
    const users =await User.find()
    
    res.status(200).json({
        success:true,
        message:"get all users",
        users

    })
}

//get all  single user 

exports.getSingleUser =async(req,res,next)=>{
    const user =await User.findById(req.params.id)
    
    res.status(200).json({
        success:true,
        message:"get allsingle user",
        user

    })
}

//change user role


exports.changeUserRole =async(req,res,next)=>{
    let updatedData={
       name:req.body.name,
       email:req.body.email,
       role:req.body.role
    }

    const user =await User.findByIdAndUpdate(req.params.id,updatedData,{new:true})

    sendToken(user,201,res,"profile updated")
}

//delete user

exports.deleteUser =async(req,res,next)=>{
    const user =await User.findByIdAndRemove(req.params.id)
    
    res.status(200).json({
        success:true,
        message:"delete user",
        user

    })
}