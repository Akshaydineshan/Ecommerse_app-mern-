const mongoose = require("mongoose");
const validator =require('validator')
let bcrypt=require('bcryptjs')
const jwt =require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config({
  path:'../config/.env'
})


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please your Name"],
    minlength: [3, "Please enter a name atleast 3 characters"],
    maxlength: [15, "Name can not big than 15 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: [validator.isEmail, "Please enter a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password!"],
    minlength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken:String,
  resetpasswordtime:Date,
 
});

//hash password
userSchema.pre("save", async function(next){

  this.password = await bcrypt.hash(this.password, 10);
});

//jwt
 userSchema.methods.getJwtToken=function(){
  return jwt.sign({id:this._id},process.env.jwtSecretKey)
 }
 //compare
 userSchema.methods.comparePassword=async function(enteredPassword){
  console.log(this);
  return  bcrypt.compare(enteredPassword,this.password);
};
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword,this.password);
// };


module.exports = mongoose.model("User", userSchema);