const express =require("express")
const cors=require('cors')
const dotenv =require('dotenv')
const mongoose =require('mongoose')
const app =express()
const ErrorHandler=require('./Middleware/error')
const cookieParser =require('cookie-parser')

dotenv.config({
    path:'./config/.env'
})


app.use(cors())
app.use(cookieParser())
app.use(express.json())
// console.log(akshay)

// process.on('uncaughtException',(err)=>{
//     console.log("shutting down for "+err)
// })



mongoose.connect(process.env.DB,{useNewUrlParser: true,}).then((data)=>{
    console.log("mongodb connected successfully")
}).catch((err)=>{
    console.log("connection failed")
})



const productRoute=require('./Routes/ProductRoute')
const userRoute=require('./Routes/UserRoutes')


app.use('/api/v2',productRoute)
app.use('/api/v2/',userRoute)
app.use(ErrorHandler)








app.listen(process.env.PORT,()=>{
   console.log(`server started  http://localhost:${process.env.PORT}`);
})