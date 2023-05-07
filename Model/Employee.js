import mongoose from "mongoose";

const EmployeeSchema = mongoose.Schema({
    name : {type : String , required : "Employee must have a Name"},
    birthDate : {type : Date , required : "Employee must have Date of Birth"},
    gender : {type : String , enum : "M" || "F" || "O"},
    address : {String , required : "Employee must add his/her address"},
    status : { type : Number , enum : 1 || -1 || 0},
    designation : {type : String , required : "Employee must add his current designation"},
    salary : {type : Number , default : 0},
    salaryPendingForMonths : [String],
    clockIn : {type : Number},
    clockOut : {type : Number} 
})

export default mongoose.model("Employee", EmployeeSchema)