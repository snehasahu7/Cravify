import express from "express"
import cors from "cors"
import { connectdb } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

connectdb();

app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart", cartRouter);
app.use("/api/order",orderRouter);

app.get("/",(err,res)=>{
    res.send("API WORKING");
})

app.listen(port,()=>{
    console.log(`Server running on port ${port} `)
})

