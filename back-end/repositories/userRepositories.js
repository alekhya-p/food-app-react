import userModel from "../models/userModel.js";

const getUserById = async (userId) => {
  return await userModel.findById(userId);
};

const updateUserCart = async (userId, cartData) => {
  return await userModel.findByIdAndUpdate(userId, { cartData });
};

const getUserByEmail = async (email) => {
    return await userModel.findOne({email});
}

const createNewUser = (name, email, hashedPassword) => {
  return new userModel({
    name: name,
    email: email,
    password: hashedPassword
  })
}
export { getUserById, updateUserCart, getUserByEmail, createNewUser};
