import foodModel from "../models/foodModal.js";
import fs from "fs";


//add food item

const addFood = async (req, res) => {

    console.log("File received:", req.file);  // Log the file object
    console.log("Request body:", req.body);  // Log the form data
    
    if(!req.file) {
        return res.status(400).send('no file uploaded');
    }
    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addFood}