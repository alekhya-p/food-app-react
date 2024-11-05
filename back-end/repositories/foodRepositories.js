import foodModel from "../models/foodModel.js";

const addFoodData = (req) => {
    let image_filename = `${req.file.filename}`;
  return new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
};

const listFoodItems = async () => {
    return await foodModel.find({});
}

const getFoodItem = async (foodId) => {
    return await foodModel.findById(foodId)
}

const removeFoodItem = async (foodId) => {
    await foodModel.findByIdAndDelete(foodId);
}

export { addFoodData, listFoodItems, getFoodItem, removeFoodItem };
