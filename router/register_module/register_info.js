const express=require("express")
const router=express.Router()
const registerContoller=require("../../controller/register_module/register_info")

//router for User registration
router.post("/register",registerContoller.registerUser)

// router to handle login
router.post("/login",registerContoller.loginUser)
router.post("/logout",registerContoller.logoutUser)
module.exports=router



