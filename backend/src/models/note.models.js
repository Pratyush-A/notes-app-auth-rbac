const mongoose=require('mongoose')

const noteSchema=new mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:String,
    description:String,
})

const note=mongoose.model("note",noteSchema)

module.exports=note