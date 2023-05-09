import mongoose from "mongoose";

const EmployeeSchema = mongoose.Schema({
    // id : {type : Number , default: 1000},
    name : {type : String },
    email : {type : String },
    password : {type : String },
    birthDate : {type : String },
    gender : {type : String , enum : ["M" , "F" , "O"]},
    mobile : {type : Number},
    // address : {String },
    status : { type : Number , enum : [1 , -1, 0]},
    designation : {type : String },
    salary : {type : Number , default : 0},
    salaryPendingForMonths : [String],
    clockIn : {type : Number},
    clockOut : {type : Number},
})

export default mongoose.model("Employee", EmployeeSchema)

    