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

const removeFromCart = async (req, res) => {};

const getCart = async (req, res) => {};

export { addToCart, removeFromCart, getCart };
