const mongoose=require('mongoose')


exports.dbConnection=async()=>{
    try{
           await mongoose.connect(process.env.MONGO_URL)
           console.log("MongoDB connected")
    }
    catch(error){
        console.log("error in DB connection",error)
    }
}