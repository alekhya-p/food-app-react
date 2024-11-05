//The Node.js file system module used to interact with files, such as deleting an uploaded image.
import fs from "fs";
import {
  addFoodData,
  getFoodItem,
  listFoodItems,
  removeFoodItem,
} from "../repositories/foodRepositories.js";

//add food item
const addFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("no file uploaded");
  }

  // creates a new food item based on the client’s request.
  const addfoodItems = addFoodData(req);

  try {
    await addfoodItems.save();
    res.status(200).json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Food is not added" });
  }
};

const listFood = async (req, res) => {
  try {
    const foodList = await listFoodItems();
    res.json({ success: true, data: foodList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const removeFood = async (req, res) => {
  try {
    const removeItem = await getFoodItem(req.body.id);
    //to delete image from file system
    fs.unlink(`uploads/${removeItem.image}`, () => {});

    await removeFoodItem(req.body.id);
    res.json({ success: true, message: "Food removed sucessfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Food not removed" });
  }
};

export { addFood, listFood, removeFood };
