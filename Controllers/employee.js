import mongoose from "mongoose";
import Employee from "../Model/Employee.js";

export const getAllEmployee = async(req,res)=>{
        try {
            const allEmployees = await Employee.find();
            const allEmployeeDetails = []
            allEmployees.foreach(employee => {
                allEmployeeDetails.push({_id : employee._id , name : employee.name, designation : employee.designation , dob : employee.birthdate , gender : employee.gender , address : employee.address , status : employee.status   })
            })
            res.status(200).json(allEmployeeDetails);        
        } catch (error) {
            res.status(404).json({message : error.message})
        }
}