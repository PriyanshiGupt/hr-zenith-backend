import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from "cors";
import bodyParser from "body-parser";
import employeeRoutes from './Routes/employee.js';
import projectdetails from './Routes/projectdetails.js'
import projectreports from './Routes/projectReports.js'
import transactionRouts from './Routes/transactions.js'
import leaves from "./Routes/leaves.js";
import adminRoute from './Routes/admin.js'
const app = express()
dotenv.config()
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// const router = express.Router()
app.use('/Admin' , adminRoute)
app.use('/Employee' , employeeRoutes)
app.use('/Project' , projectdetails);
app.use('/Report' , projectreports)
app.use('/transactions', transactionRouts)
app.use('/Leaves', leaves)
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


app.listen(PORT, '0.0.0.0',(err) => {
    console.log('Server is listening at', PORT, err)
})