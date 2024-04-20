const express=require("express")
const router=express.Router()
const userModelController=require("../../controller/user_module/user_info")
router.post("/createuser",userModelController.createUser)
router.get("/getuser",userModelController.getUser)
router.get("/getuserby/:id",userModelController.getUserById)
router.patch("/updateuser/:id",userModelController.userUpdate)
router.delete("/deleteuser/:id",userModelController.deleteUser)
module.exports=router;
