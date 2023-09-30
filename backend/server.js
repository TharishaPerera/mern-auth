import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notFound, errorhandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config()

// MongoDB connection
connectDB()

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

// user routes
app.use('/api/users', userRoutes)

// base route
app.get('/', (req, res) => {
    res.send("Server is ready")
})

// Add middleware - custom error handlers
app.use(notFound)
app.use(errorhandler)

app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`)
})