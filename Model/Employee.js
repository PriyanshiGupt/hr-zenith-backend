import mongoose from "mongoose";

const EmployeeSchema = mongoose.Schema({
    // id : {type : Number , default: 1000},
    name : {type : String },
    email : {type : String },
    password : {type : String },
    dob : {type : String },
    gender : {type : String , enum : ["M" , "F" , "O"]},
    mobile : {type : Number},
    // address : {String },
    status : { type : Number , enum : [1 , -1, 0], default : 0},
    designation : {type : String },
    salary : {type : Number , default : 0},
    salaryPendingForMonths : {type : Array, default:['May']},
    clockIn : {type : Number , default : null},
    clockOut : {type : Number , default : null}
})

export default mongoose.model("Employee", EmployeeSchema)

    