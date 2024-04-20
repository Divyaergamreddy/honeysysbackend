const express=require("express")
const router=express.Router()
const storeController=require("../../controller/store_module/store_info")
router.post("/createstore",storeController.createStore)
router.get("/getstore",storeController.getStore)
router.get("/getstoreby/:id",storeController.getStoreById)
router.patch("/update/:id",storeController.updateStore)
router.delete("/deletestore/:id",storeController.deleteStore)
module.exports=router