const mongoose=require('mongoose')
require('dotenv').config()
module.exports=()=>{
    const connectionParams ={
        useNewUrlParser:true,
        useUnifiedTopology:true
    };
    try{
        mongoose.connect(process.env.MONG_URL,connectionParams)
        console.log("Connected to database")

    }   
    catch(error)
    {
        console.log("connection failed")
    }
    
}