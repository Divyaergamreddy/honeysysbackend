const userModel=require("../../model/user_module/user_info")
const errormessages = require("../../config/errormessages")

// Create API 
exports.createUser=async(req,res)=>{
    try {
        const{firstname,lastname,gender,email,mobileno,password}=req.body
if(!firstname||!lastname||!gender||!email||!mobileno||!password){
    return res.status(201).json({
        status:statusmessages.SUCCESS,
        message:errormessages.USER_REQUIRED_FIELDS
    })
}
// Email Validation
const emailRegExp= /.+\@+..+\.+..+/
if(!emailRegExp.test(email)){
    return res.status(501).json({
        status:statusmessages.FAILED,
        message:errormessages.INVALID_EMAIL_FORMAT
    })
}
// Mobile validation
const mobilenoRegExp=/^\d{10}$/
if(!mobilenoRegExp.test(mobileno)){
    return res.status(501).json({
        status:statusmessages.FAILED,
        message:errormessages.INVALID_MOBILE_FORMAT
    })
}
// Password validation
const passwordRegExp=/^\d{05}$/
if(!passwordRegExp.test(password)){
    return res.status(501).json({
        status:statusmessages.FAILED,
        message:errormessages.INVALID_PASSWORD_FORMAT
    })
}
const userDataInfo=await userModel.create({firstname,lastname,gender,email,mobileno,password})
return res.status(201).json({
    status:statusmessages.SUCCESS,
    message:errormessages.USER_CREATED,
    userDataInfo
})    
} 
    catch (error) {
      return res.status(401).json({
        status:statusmessages.FAILED,
        message:error.message

      })
    }
}


// get API
exports.getUser=async(req,res)=>{
    try {
        const getUserData=await userModel.find({del_flag:0})
        return res.status(201).json({
            message:"Get API is successfully created",getUserData
        })
    } catch (error) {
        return res.status(401).json({
            status:statusmessages.FAILED,
            message:error.message
        })
        
    }
}

// getById API
exports.getUserById=async(req,res)=>{
    try {
        const id=req.params.id
        const getUserById=await userModel.findById(id,{del_flag:0})
        return res.status(200).json({
            message:"This is user data",getUserById
        })
    } catch (error) {
        return res.status(401).json({
            status:statusmessages.FAILED,
            message:error.message
        })
    }
}


// Update API

exports.userUpdate=async(req,res)=>{
    try {
        const id=req.params.id
//  Mobile validation
        const{mobileno}=req.body
        const mobilenoRegExp=/^\d{10}$/
if(!mobilenoRegExp.test(mobileno)){
    return res.status(501).json({
        status:statusmessages.FAILED,
        message:errormessages.INVALID_MOBILE_FORMAT
    })
}
        const findUserInfo=await userModel.findById(id)
        if(findUserInfo){
            // email validation
            if(req.body.email){
                const emailRegExp= /.+\@+..+\.+..+/
if(!emailRegExp.test(req.body.email)){
    return res.status(501).json({
        status:statusmessages.FAILED,
        message:errormessages.INVALID_EMAIL_FORMAT
    })
}
            }
// Password validation
            if(req.body.password){
const passwordRegExp=/^\d{05}$/
if(!passwordRegExp.test(req.body.password)){
    return res.status(501).json({
        status:statusmessages.FAILED,
        message:errormessages.INVALID_PASSWORD_FORMAT
    })
}
            }
            const modifyUserInfo=await userModel.findByIdAndUpdate({_id:id},{$set:req.body},{new:true})
            return res.status(200).json({
                status:statusmessages.SUCCESS,
                message:errormessages.USER_UPDATED,
                modifyUserInfo
            })
        }
        else{
            return res.status(404).json({
                status:statusmessages.FAILED,
                message:errormessages.USER_INVALID
            })
        }  
    } catch (error) {
        return res.status(401).json({
            status:statusmessages.FAILED,
            message:error.message
        })
        
    }
}


// Delete API(Hard Delete)
// exports.deleteUser=async(req,res)=>{
//     try {
//         const id=req.params.id
//         const deleteUserDataById=await userModel.findByIdAndDelete(id)
//         return res.status(200).json({
//             message:errormessages.USER_DELETED,
// deleteUserDataById
//         })
//     } catch (error) {
//         return res.status(401).json({
//             status:statusmessages.FAILED,
//             message:error.message
//         })
//     }
// }

//Delete (Soft Delete) 
exports.deleteUser=async(req,res)=>{
    try {
        const id=req.params.id
// Check if the user is already marked as deleted
const userToDelete = await userModel.findById(id);
if (userToDelete.del_flag === 1) {
    return res.status(400).json({
        status:statusmessages.FAILED,
        message:errormessages.USER_ALREADY_DELETED
    });
}
// Deleting the data if it is not deleted
        const deleteUserDataById=await userModel.findByIdAndUpdate({_id:id},{del_flag:1},{new:true})
return res.status(200).json({
    message:errormessages.USER_DELETED,
    deleteUserDataById
});
} catch (error) {
return res.status(401).json({
    status:statusmessages.FAILED,
    message: error.message
});
}
}

