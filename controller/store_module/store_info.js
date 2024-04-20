const storeModel=require("../../model/store_module/store_info");
const errormessages = require("../../config/errormessages");
const statusmessages=require("../../config/statusmessages")
// Create API
exports.createStore=async(req,res)=>{
    try {
        const{storename,storeid,storedescription,contact}=req.body
        if(!storename||!storeid||!storedescription||!contact){
            return res.status(401).json({
                status:statusmessages.FAILED,
                message:errormessages.STORE_REQUIRED_FIELDS      
            })
        }
        // Mobile validation
const contactRegExp=/^\d{10}$/
if(!contactRegExp.test(contact)){
    return res.status(501).json({
        status:statusmessages.FAILED,
        message:errormessages.INVALID_CONTACT_FORMAT
    })
}
        const storeData=await storeModel.create({storename,storeid,storedescription,contact})
        return res.status(201).json({
            status:statusmessages.SUCCESS,
            message:errormessages.STORE_CREATED,
            storeData
        })
    } catch (error) {
        return res.status(401).json({
            status:statusmessages.FAILED,
            message:error.message
        })
    }
}
// Get API
exports.getStore=async(req,res)=>{
    try {
        const storeData=await storeModel.find({del_flag:0});
        return res.status(200).json({
            status:statusmessages.SUCCESS,
            message:errormessages.GET_STORE_DATA,
            storeData,
        })
    } catch (error) {
       return res.status(500).json({
        status:statusmessages.FAILED,
        message:error.message,
       }) 
    }
}

// getById API
exports.getStoreById=async(req,res)=>{
    try {
        const id=req.params.id
        const storeById=await storeModel.findOne({_id:id,del_flag:0})
        return res.status(200).json({
            status:statusmessages.SUCCESS,
            message:errormessages.GETBYID_STORE_DATA,
            storeById,
        })
    } catch (error) {
        return res.status(500).json({
            status:statusmessages.FAILED,
            message:error.message,
        })
    }
}

// Update API
exports.updateStore=async(req,res)=>{
    try {
        const id=req.params.id
        const findStoreInfo=await storeModel.findById(id)
        if(findStoreInfo){
            const updatedStoreInfo=await storeModel.findByIdAndUpdate({_id:id},{$set:req.body},{new:true})
            return res.status(200).json({
                status:statusmessages.SUCCESS,
                message:errormessages.STORE_UPDATED,
                updatedStoreInfo,
            })
        }   
    } catch (error) {
        return res.status(401).json({
            status:statusmessages.FAILED,
            message:error.message,
        })
    }
}

// Delete API(Hard Delete)
// exports.deleteStore=async(req,res)=>{
//     try {
//         const id=req.params.id
//         const deletedStore=await storeModel.findByIdAndDelete(id)
//         return res.status(200).json({
//             status:statusmessages.SUCCESS,
//             message:errormessages.DELETE_STORE,
//             deletedStore,
//         })
//     } catch (error) {
//         return res.status(500).json({
//             status:statusmessages.FAILED,
//             message:error.message,
//         })
//     }
// }

//Delete (Soft Delete) 
exports.deleteStore=async(req,res)=>{
    try {
        const id=req.params.id
// Check if the user is already marked as deleted
const storeToDelete = await storeModel.findById(id);
if(!storeToDelete){
    return res.status(404).json({
        status:statusmessages.FAILED,
        message:errormessages.STORE_NOT_FOUND
    })
}

// Check if the store is already marked as deleted
if (storeToDelete.del_flag === 1) {
    return res.status(400).json({
        status: statusmessages.FAILED,
        message: errormessages.STORE_ALREADY_DELETED
    });
}
// Deleting the data if it is not deleted
        const deleteStoreDataById=await storeModel.findByIdAndUpdate({_id:id},{del_flag:1},{new:true})
        if (!deleteStoreDataById) {
    return res.status(200).json({
        status: statusmessages.FAILED,
        message: errormessages.STORE_NOT_FOUND
    });
}
return res.status(200).json({
    message:errormessages.DELETE_STORE,
    deleteStoreDataById
});
} catch (error) {
return res.status(401).json({
    status: statusmessages.FAILED,
    message: error.message
});
}
}



