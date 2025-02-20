import express from "express";
import authMiddleware from "../middleware/auth.js";
import { addtocart,removefromcart,getcart } from "../controllers/cartController .js";


const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addtocart);
cartRouter.post("/remove",authMiddleware,removefromcart);
cartRouter.post("/get",authMiddleware,getcart);

export default cartRouter;