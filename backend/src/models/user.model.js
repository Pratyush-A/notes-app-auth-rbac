const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{type:String,unique:true},
    email:{type:String,unique:true},
    role:{type:String,default:'user'},
    password:String
})

const User=new mongoose.model("User",userSchema)

module.exports=User