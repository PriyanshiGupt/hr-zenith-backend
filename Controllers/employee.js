import mongoose from "mongoose";
import Employee from "../Model/Employee.js";
import Transactions from "../Model/Transactions.js";
import bcrypt from 'bcryptjs'

export const getAllEmployee = async(req,res)=>{
        try {
            const allEmployees = await Employee.find();
            const allEmployeeDetails = []
            allEmployees.forEach(employee => {
                allEmployeeDetails.push({_id : employee._id, name : employee.name, email : employee.email, mobile: employee.mobile,  designation : employee.designation ,
                    dob: employee.dob , gender : employee.gender , status : employee.status,salary : employee.salary,salaryPendingForMonths : employee.salaryPendingForMonths, clockIn : employee.clockIn, clockOut: employee.clockOut   })
            })
            res.status(200).json(allEmployeeDetails);        
        } catch (error) {
            res.status(404).json({message : error.message})
        }
}

export const addEmployee = async(req,res)=>{
    try {
        const { email,password} = req.body;
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
        res.status(200).json("Employee Salary Updated")
    } catch (error) {
        res.status(500).json("Could not Update Employees Salary")
    }
}
export const addSalary = async(req,res)=>{
    const {salary, month, empId:id} = req.body;
    // const { id:_id } = req.params ;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('Invalid Employee...');
    }
    try {
        const employee = await Employee.findById( id ).lean()
        const pendingMonths = employee.salaryPendingForMonths;
        pendingMonths.splice(pendingMonths.indexOf(month),1);
        await Employee.findByIdAndUpdate(id, {$set: { salaryPendingForMonths : pendingMonths}})
        await Transactions.create(req.body)
        res.status(200).json("Employee Salary added")
    } catch (error) {
        console.log(error)
        res.status(500).json("Could not complete Employee Salary transaction")
    }
}

export const login = async(req,res)=>{
    
    const {email,password} = req.body;
    const existingEmployee = await Employee.findOne({email});
    // console.log(existingEmployee.status);
    if(existingEmployee.status == 0){
        res.status(400).json("Your Appication is Pending for Approval, Pls Contact Admin");
        return;
    }
        if(!existingEmployee){
           res.status(400).json("UserName AndOr Password Has Not Been Recorgnized");
        }
        try {
            const isPasswordCorrect = await bcrypt.compare(password,existingEmployee.password);

            if(!isPasswordCorrect){
                res.status(300).json("UserName AndOr Password Has Not Been Recorgnized");
            }
            else{res.status(200).json(existingEmployee?._id);}
        } catch (error) {
            res.status(500).json(error);
        }
}


export const clockin = async(req,res)=>{
    try{
        const {id:_id} = req.body;
    const emp = await Employee.findByIdAndUpdate( _id, { $set: { 'clockIn': Date.now() , 'clockOut' : null }}, { new: true } )
    res.json(emp);
    }catch(error){
        res.json(error);
    }
    
}

export const clockout = async(req,res)=>{
    try{
        const {id : _id} = req.body;
    const emp = await Employee.findByIdAndUpdate( _id, { $set: { 'clockOut': Date.now()  }}, { new: true } )
    res.json(emp);
    }catch(error){
        res.json(error);
    }
    
}