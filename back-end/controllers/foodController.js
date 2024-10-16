import foodModel from "../models/foodModal.js";
import fs from "fs";

//add food item
const addFood = async (req, res) => {

    // console.log("File received:", req.file);  // Log the file object
    // console.log("Request body:", req.body);  // Log the form data
    
    if(!req.file) {
        return res.status(400).send('no file uploaded');
    }
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Food added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Food is not added"})
    }
}

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

const removeFood = async(req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        //to delete image from file system
        fs.unlink(`uploads/${food.image}`,()=>{});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message:"Food removed sucessfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Food not removed"})
    }
}

export {addFood, listFood, removeFood}