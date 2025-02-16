import mongoose from "mongoose";

 export const connectdb= async ()=>{
    await mongoose.connect('mongodb+srv://snehasahuu07:helloworld07@cluster0.ke6mm.mongodb.net/cravify').then(()=>console.log("Db connected"));
}