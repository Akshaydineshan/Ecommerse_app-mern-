

const sendToken=(user,statusCode,res,message)=>{
        const token =user.getJwtToken()


        res.status(statusCode)
        .cookie("token",token)
        .json({
            success:true,
            user,
            token,
            message
        })
        
}

module.exports =sendToken