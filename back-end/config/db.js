import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://alekhyapeddisetti:9440085568@cluster0.l4ki1.mongodb.net/food-app"
    )
    .then(() => console.log("DB connected"));
};
