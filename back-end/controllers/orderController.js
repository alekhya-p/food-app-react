import orderModel from "../models/orderModal.js";
import userModel from "../models/userModal.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
//placing user order for FE
const placeOrder = async (req,res) => {

    const FE_url = 'http://127.0.0.1:5174/'
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newnewOrder.save();

        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${FE_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${FE_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        return res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error);
        
        return res.json({success:false,message:"Error"})
    }
}

const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        console.log(orders);
        
    res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"error"
        })
    }
}

export{placeOrder, userOrders}