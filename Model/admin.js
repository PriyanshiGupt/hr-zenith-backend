import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
    email : String,
    password : String
})
export default mongoose.model("Admin", AdminSchema);