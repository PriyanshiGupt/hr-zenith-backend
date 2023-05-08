import mongoose from "mongoose";

const ProjectReport = mongoose.Schema({

        projectName : String,
        employeeName : String,
        report : String,
        reportedTime : {type : Date , default : Date.now}
    
})

export default mongoose.model("ProjectReport", ProjectReport)