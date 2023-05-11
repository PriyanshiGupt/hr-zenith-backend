import mongoose from "mongoose";
import ProjectReport from "../Model/ProjectReport.js";
import Employee from "../Model/Employee.js";
export const getProjectReports = async(req,res)=>{
    try {
        const allreports = await ProjectReport.find();
        // const allProjectReports = [];
        // allreports.forEach(report => 
        // {
        //     allProjectReports.push({projectName : report.projectName, employeeName: report.employeeName,projectReport : report.projectReport }) })
        res.status(200).json(allreports);        
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

export const addReport = async(req,res)=>{
    try {
        const {empId} = req.body;
        const body = req.body;
        const emp = await Employee.findById(empId);
        const name1 = emp?.name;
        body.employeeName = name1;
        const newReport = await ProjectReport.create(body);
        res.status(200).json({result : newReport})
    } catch (error) {
        
        res.status(500).json("Report could not be created...  " + error);
        console.log(error)
    }
}