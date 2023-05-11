import mongoose from "mongoose";

const projecDetails = mongoose.Schema({
        empId: String,
        projectName : String,
        clientName : String,
        projectType : String,
        projectManager : String,
        developingPlatform : String,
        databaseTech : String,
        description : String,
        addedon : {type : Date , default : Date.now}
   
})

export default mongoose.model("Details", projecDetails)