import mongoose from "mongoose";


const Leaves = mongoose.Schema({
    empId : String,
    name : String,
    reason : String,
    fromDate : String,
    toDate : String,
    appliedOn : {type : Date , default : Date.now},
    status : { type : Number , enum : [1 , -1, 0], default : 0},

})

export default mongoose.model("Leaves", Leaves)