const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email: {
    type:String,
    match:/.+\@+..+/,
    required:true,
    unique:true,
},
otp:{
    type:String,
    required:true,
}
//     password:{
//     type:String
// },
//     confirmpassword:{
//     type:String
// },
// loginAttempts:{
//     type:Number,default:0
// }
})
module.exports=mongoose.model("register_details",userSchema)
