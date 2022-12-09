const ErrorHandler=require('../utils/errorhandler')


module.exports=(err,req,res,next)=>{
    
   
    err.statusCode=err.statusCode || 500
    err.message=err.message || "internal server error"



    if(err.name=="CastError"){
        err= new ErrorHandler("Resourse not found invalid id",400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}