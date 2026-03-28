const mongoose = require('mongoose')


async function connectDB() {
   try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB")
   }
   catch(err){
    console.error("Error connecting to MongoDB",process.env.MONGO_URI,err)
   }
}

module.exports = connectDB