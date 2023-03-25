const mongoose = require("mongoose");


//schema
const userSchema = mongoose.Schema({
    email:String,
    pass:String,
    location:String,
    age:Number
},{
    versionKey:false
})


//model
const UserModel = mongoose.model("user",userSchema)

module.exports = {UserModel}