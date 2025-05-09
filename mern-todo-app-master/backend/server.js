import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import userRouter from "./routes/userRoute.js"
import taskRouter from "./routes/taskRoute.js"
import forgotPasswordRouter from "./routes/forgotPassword.js"

//app config
dotenv.config()
const app = express()
const port = process.env.PORT || 8001
mongoose.set('strictQuery', true);

//middlewares
app.use(express.json())
app.use(cors())

// Root route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Todo App API" });
});

//db config
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connected to MongoDB.");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
});

//api endpoints
app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)
app.use("/api/forgotPassword", forgotPasswordRouter)

//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))