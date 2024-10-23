import userModel from "../models/userModal.js";

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);

    // Initialize cartData if it doesn't exist
    let cartData = await userData.cartData || {};

    // Add item to cart or increment if it already exists
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:'true',message: "Removed from the cart"})
    } catch (error) {
        console.log(error);
        res.json({success:'true',message:"Error"})
    }
};

const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:'true',cartData})
    } catch (error) {
        console.log(error);
        res.json({success:'true',message:"Error"})
    }
};

export { addToCart, removeFromCart, getCart };
