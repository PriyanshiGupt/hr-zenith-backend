import mongoose from "mongoose";
import ProjectReport from "../Model/ProjectReport.js";

export const getProjectReports = async(req,res)=>{
    try {
        const allreports = await ProjectReport.find();
        const allProjectReports = [];
        allreports.forEach(report => 
        {
            allProjectReports.push({projectName : report.projectName, employeeName: report.employeeName,projectReport : report.projectReport }) })
        res.status(200).json(allProjectReports);        
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

export const addReport = async(req,res)=>{
    try {
        
        const newReport = await ProjectReport.create(req.body);
        res.status(200).json({result : newReport})
    } catch (error) {
        
        res.status(500).json("Report could not be created...  " + error);
        console.log(error)
    }
}