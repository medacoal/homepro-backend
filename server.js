import express from 'express';
import dotenv from "dotenv"
import morgan from 'morgan';
import LoginRouter from "./src/routes/auth/login.js"
import RegisterRouter from "./src/routes/auth/register.js"
import { globalMiddleware } from './src/middlewares/auth.js';
import { connectDb } from './src/config/dbConfig.js';
import cors from 'cors'


dotenv.config();
// Create express app
const app = express();

app.use(express.json());

//enable cors
app.use(cors())

//middlewares
app.use(morgan("dev"));
app.use(globalMiddleware)
//Auth Route
app.use('/api', LoginRouter); //localhost:3000/api/login
app.use('/api', RegisterRouter);
app.get('/', (req, res) => {
    res.json({success: true, message: "Welcome to homeproBE"});
});

// Define your port number
const port = process.env.PORT || 3000;
const dbUrl= process.env.MONGODB_URL;


//CONNECT MONGODB DATABASE
connectDb(dbUrl)


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
