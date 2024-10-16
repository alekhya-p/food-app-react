import express from "express";
import { addFood } from "../controllers/foodController.js";
import multer from "multer"; // to create image storage sysytem

const foodRouter = express.Router();

//Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads", //Directory to store iamges
  filename: (req, file, cb) => {
    console.log("File ",file);  // Log to see if the file is being received
    return cb(null, `${Date.now()}${file.originalname}`);
  }, // define the name for the uploaded file with unique name
});

//Initialize multer with the storage option
const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood); // middleware expects a single file upload in the request with the form field name image

export default foodRouter;
