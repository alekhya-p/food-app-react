import express from 'express';
import authMiddleWare from "../middleware/auth.js"
import { placeOrder, userOrders } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleWare,placeOrder);
orderRouter.post("/userorders",authMiddleWare,userOrders)

export default orderRouter;