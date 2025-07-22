import { name } from "ejs";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_SECRET_ID,
    key_secret:process.env.RAZORPAY_SECRET_KEY,
});


const placeOrder = async (req,res) =>{
    
    const frontend_url="http://localhost:5173"
    try{
        const newOrder = new orderModel({
            userId: req.body.userId,
            items:req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item)=>({
             price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100,

             },
             quantity: item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"delivery charges",

                },
                unit_amount:2*100
            },
            quantity:1
        })

        const options = {
            amount:req.body.amount*100,
            currency:"INR",
            receipt:`order_rcptid_${newOrder._id}`,
            payment_capture:1,
        }
    
        
        const session = await razorpay.orders.create(options);
        res.json({
            success:true,
            orderId:session.id,
            amount:session.amount,
            currency:session.currency,
            newOrderId:newOrder._id
        });
        
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

const verifyOrder = async(req,res)=>{
   const {orderId,success}= req.body;
   try{
      if(success=="true"){
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,message:"Paid"})
      }
      else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false,message:"Not paid"});
      }
   }
   catch(error){
      console.log(error);
      res.json({success:true,message:"Error"});
   }
}
const userOrders=async(req,res)=>{
    try{
        const orders = await userModel.find({userId: req.body.orderId});
        res.json({success:true, data:orders});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"error"});
    }
   
}

export {placeOrder,verifyOrder,userOrders};