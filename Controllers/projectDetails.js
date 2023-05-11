import mongoose from "mongoose";
import Details from "../Model/ProjectDetails.js";


export const getAllProjects = async(req,res)=>{
    try {
        const allProjects = await Details.find();
        const allProjectDetails = [];
        allProjects.forEach(project => {
            allProjectDetails.push({ projectName : project.projectName, clientName : project.clientName, projectType: project.projectType,  projectManager : project.projectManager ,
                developingPlatform: project.developingPlatform , databaseTech : project.databaseTech ,  description : project.description , addedOn : project.addedon})
        })
        res.status(200).json(allProjectDetails);        
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}


export const addProject = async(req,res)=>{
    try {
        
        const newProject = await Details.create(req.body);
        res.status(200).json({result : newProject})
    } catch (error) {
        
        res.status(500).json("Project could not be created...  " + error);
        console.log(error)
    }
}

export const projectDetailsById = async(req,res)=>{
        try{
        const { empId } = req.params ;
        const allProjects = await Details.find({"empId" : empId});
        console.log(allProjects);
        res.status(200).json(allProjects);
        }catch(error){
            res.status(500).json(error)
        }
}