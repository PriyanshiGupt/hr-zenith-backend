import mongoose from "mongoose";

const EmployeeSchema = mongoose.Schema({
    name : {type : String , required : "Employee must have a Name"},
    birthdate : {type : Date , required : "Employee must have Date of Birth"},
    gender : {type : String , }
    
})