const jwt = require("jsonwebtoken")
const User = require("../model/user")

const isAuthenticatedUser = async(req , res , next) => {

    try{

        let {token} = req.cookies;

        console.log(token)

        if(!token){
            return res.status(401).json({success : false , message : "Please Login to access this resources" })
        }

        jwt.verify(token , process.env.JWT_SECRET , async (err , decodedData)=>{

            if (err) {

                let message = err.message = "jwt expiry" ? "token is expired , please login again" : "invalid token"
                return res.status(401).send({ status: false, msg: message })
                
            }

            req.user = await User.findById(decodedData.id)

            next()

        })

    }catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}


module.exports =  isAuthenticatedUser

