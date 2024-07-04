import mongoose from "mongoose";

const DB= process.env.DATABASE;

mongoose.connect(DB,{
    
}).then(()=>{
    console.log("mongodb connected");
}).catch((err)=>{
    console.log("mongodb connected failed");
}) 