const User =  require("../model/user")
const sendToken =  require("../util/jwtTokens.js")

//Register User

const registerUser = async(req,res,next)=>{

    try{

    const {name , email , password} = req.body

    const user =  await User.create({
        name,
        email,
        password,
        avatar:{
            public_id : "this is Sample id",
            url : "profilePicUrl"
        }
    })

    sendToken(user , 201 , res)

    }catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

const loginUser = async (req,res,next)=>{

    try{
        const {email , password} =  req.body

    //checking if user has given password and email both

    if(!email || !password){
        return res.status(400).json({status : false ,  message : "Please Enter Email and Password" })
    }
    "Invalid email & password"
    const user = await User.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({status : false ,  message : "Invalid email & password" })
    }
    
    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return res.status(401).json({status : false ,  message : "Invalid email & password" })
    }

    sendToken(user , 200 , res)

    }catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        })    
    }
    
}

//LogOut User

const logOut = async(req,res,next)=>{

    try{
        res.cookie("token" , null , {
            expires : new Date(Date.now),
            httpOnly : true
        })
        
        res.status(200).json({
            success : true,
            message : "Logged Out"
        })
    
    }catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}



//User Want to Update There password
const updatePassword =  async(req , res , next) => {

    try{

    const user = await User.findById(req.user.id).select('+password')

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if(!isPasswordMatched){
        return res.status(400).json({status : false ,  message : 'Old password is incorrect' })
    }

    if(req.body.newPassword !== req.body.conformPassword) {
        return res.status(400).json({status : false ,  message : "password does not match" })
    }

    user.password = req.body.newPassword

    await user.save()

    sendToken(user , 200 , res)

    }catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }

}

//Update user Profile --> By user
const updateProfile = async (req , res , next)=>{

    try{

        const newUserData =  {}

        let {name , email} = req.body
    
        if(name) newUserData.name = name
        if(email) newUserData.email = email

        const user = await  User.findByIdAndUpdate(req.user.id ,  {$set : newUserData} , {
            new : true ,
            runValidators : true ,
        })
    
        res.status(200).json({
            success : true
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}


module.exports =  {registerUser , loginUser , logOut  , updatePassword , updateProfile }
