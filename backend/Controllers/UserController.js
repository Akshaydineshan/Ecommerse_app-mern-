

const ErrorHandler = require('../utils/errorhandler')
const CatchAsyncError = require('../Middleware/CatchAsyncError')
const User = require('../Models/User')



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
    const token = user.getJwtToken()
    res.status(200).cookie("token",token).json({
        success: true,

        token
    })
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
  
    if(!isPasswordMatched ){
        return next(new ErrorHandler("massword mismatch", 400));
     }
   
     const token = user.getJwtToken()
     res.status(200).cookie("token",token).json({
         success: true,
         token,
        
     })


}

exports.logoutUser =async(req,res,next)=>{
    res.cookie("token",null,{expires:new Date(Date.now()),httpOnly:true}).status(200).json({
        success:true,
        message:"logout success"
    })
}