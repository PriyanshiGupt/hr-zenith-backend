import mongoose from "mongoose";

const projecDetails = mongoose.Schema({
        projectName : String,
        clientName : String,
        projectType : String,
        projectManager : String,
        developingPlatform : String,
        databaseTech : String,
        description : String,
        addedon : {type : Date , default : Date.now}
   
})

export default mongoose.model("projectDetails", projecDetails)