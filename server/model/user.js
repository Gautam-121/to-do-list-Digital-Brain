const mongoose = require("mongoose")
const validator = require("validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true , "Please Enter Your Name"],
        maxLength:[30,"Name cannot exceed 30 Character"],
        minLength:[4,"Name should have more than 4 Character"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password:{
        type:String,
        required:[true ,"Please Enter Your Password"],
        minLength:[8,"Password should be greater than equal 8 chracter"],
        select : false
    }
});

userSchema.pre("save", async function(next){
  
    if (!this.isModified("password")){
        next()    
    }

    this.password =  await bcrypt.hash(this.password , 10)
})

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  

// Compare Password
 userSchema.methods.comparePassword =  function (password) {
    return bcrypt.compare(password, this.password);
}


module.exports = mongoose.model("user" , userSchema) 

