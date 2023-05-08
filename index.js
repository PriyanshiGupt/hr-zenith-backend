import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from "cors";
import bodyParser from "body-parser";
import employeeRoutes from './Routes/employee.js';



const app = express()
dotenv.config()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// const router = express.Router()

app.use('/Employee' , employeeRoutes)


const PORT = process.env.PORT

app.get('/',(req,res)=>{
    res.status(200).send("This is Zenith Backend API");
})

const DATABASE_URL = process.env.CONNECTION_URL;
mongoose.set({ strictQuery: true })
mongoose.connect(DATABASE_URL ,{useNewUrlParser : true , useUnifiedTopology : true})
.then(()=>{
    console.log("CONNECTION WITH DATABASE IS SUCESSFULLY ESTABILISHED")
})
.catch(()=>{
    console.log("DATABASE CONNECTION LOST")
})


app.listen(PORT, (err) => {
    console.log('Server is listening at', PORT, err)
})
