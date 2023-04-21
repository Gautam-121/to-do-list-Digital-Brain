const express = require("express")
const router = express.Router()
const {registerUser , loginUser, logOut , updatePassword , updateProfile   } = require("../controller/user-controller")
const isAuthenticatedUser = require('../middleware/auth.js')

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route("/logOut").get(logOut)

router.route('/password/update').put(isAuthenticatedUser , updatePassword)

router.route('/me/update').put(isAuthenticatedUser , updateProfile)





module.exports =  router