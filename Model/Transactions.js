import mongoose from "mongoose";

const Transactions = mongoose.Schema({
        empId : String,
        name : String,
        salary : Number,
        month : String,
        transactionTime : {type : Date , default : Date.now}
    
})

export default mongoose.model("Transactions", Transactions)