import mongoose from "mongoose";
import Employee from "../Model/Employee.js";
import bcrypt from 'bcryptjs'

export const getAllEmployee = async(req,res)=>{
        try {
            const allEmployees = await Employee.find();
            const allEmployeeDetails = []
            allEmployees.forEach(employee => {
                allEmployeeDetails.push({_id : employee._id, name : employee.name, email : employee.email, mobile: employee.mobile,  designation : employee.designation ,
                    dob: employee.birthDate , gender : employee.gender , status : employee.status,salary : employee.salary,salaryPendingForMonths : employee.salaryPendingForMonths   })
            })
            res.status(200).json(allEmployeeDetails);        
        } catch (error) {
            res.status(404).json({message : error.message})
        }
}

export const addEmployee = async(req,res)=>{
    try {
        const {name , email,password} = req.body;
        console.log(req.body);
        const existingEmployee = await Employee.findOne({email});
        if(existingEmployee){
            
            return res.status(404).json({message : "Employee Already Exists"})
        }
        // console.log("req.body.password", req.body.password);
        const hashedPassword = await bcrypt.hash(password , 12);
        req.body.password = hashedPassword
        const newEmployee = await Employee.create(req.body);
        res.status(200).json({result : newEmployee})
    } catch (error) {
        
        res.status(500).json("Employee could not be created...  " + error);
        console.log(error)
    }
}

export const approveEmployee = async(req,res)=>{
    
    const { id: _id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).send('Employee unavailable...');
        }
        try {
            const updatedProfile = await Employee.findByIdAndUpdate( _id, { $set: { 'status': 1 }}, { new: true } )
            res.status(200).json(updatedProfile)
        }catch (error) {
            console.log(error)
            res.status(404).send("Could not change status")
        }
}


export const rejectEmployee = async(req,res)=>{
    const { id:_id } = req.params ;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Employee is Unavailable...');
    }

    try {
        await Employee.findByIdAndRemove( _id );
        res.status(200).json("Employee Sucessfully Rejected");
    } catch (error) {
        res.status(404).json(error);
    }
}

export const detailsbyid = async(req,res)=>{
    const { id:_id } = req.params ;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Employee is Unavailable...');
    }
    try {
        const Profile = await Employee.findById(_id).lean();
        console.log(Profile)
        delete Profile.password;
        console.log(Profile)
        res.status(200).json(Profile)
    } catch (error) {
        res.status(500).send("Could not Fetch Details by Id")
    }
}

export const updateSalary = async(req,res)=>{
    const {salary} = req.body;
    const { id:_id } = req.params ;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Employee is Unavailable...');
    }
    try {
        const updatedSalary = await Employee.findByIdAndUpdate( _id, { $set: { 'salary': salary}}, { new: true } )
        res.status(200).json(updatedSalary)
    } catch (error) {
        res.status(500).send("Could not Update Employees Salary")
    }
}