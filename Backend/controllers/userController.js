import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";




const loginuser= async (req,res)=>{
   const {email,password} = req.body;
   try{
     const user = await userModel.findOne({email});
     if(!user){
        return res.json({success:false, message:"User does not exist"});
     }
     const ismatch = await bcrypt.compare(password,user.password);
     if(!ismatch){
        return res.json({success:false, message:"Invalid credentials "});
     }

      const token = createToken(user._id);

      return res.json({success:true, token});
   }
   catch(error){
      console.log(error);
      return res.json({success:false, message:"error"});
   }
}

const createToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}


const registeruser = async(req, res) =>{
   const {name,email,password} = req.body;
   try{
     const exists = await userModel.findOne({email});
     if(exists){
        return res.json({success:false,message:"User Already exists"});
     }

     if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please provide a valid email"});
     }

     if(password.length<8){
        return res.json({success:false,message:"Please provide a strong password"});
     }
     const salt = await bcrypt.genSalt(10);
     const hashedpassword = await bcrypt.hash(password,salt);
     const newuser = new userModel({
        name:name,
        email:email,
        password:hashedpassword
     })

     const user = await newuser.save();
     const token = createToken(user._id)
     res.json({success:true, token});
   }
   catch(error){
      console.log(error)
      res.json({success:false, message:"error"})
   }
}


export {loginuser, registeruser};