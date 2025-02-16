import express from "express"
import cors from "cors"
import { connectdb } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";



//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

connectdb();

app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))

app.get("/",(err,res)=>{
    res.send("API WORKING");
})

app.listen(port,()=>{
    console.log(`Server running on port ${port} `)
})

