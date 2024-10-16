import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRouter.js"

//app config
const app = express()
const port = 4000

//middleware

app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("api/food",foodRouter)

app.get("/", (req, res) => {
    res.send("API is working")
})

app.listen(port,()=> {
    console.log(`Server started on http://localhost:${port}`);
})

//mongodb+srv://alekhyapeddisetti:9440085568@cluster0.l4ki1.mongodb.net/?