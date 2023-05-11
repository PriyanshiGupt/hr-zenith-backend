import mongoose from "mongoose";
import Leaves from "../Model/Leaves.js";
import Employee from "../Model/Employee.js";
export const getAllLeaves = async(req, res) => {
    try {
        const allLeaves = await Leaves.find();
        res.status(200).json(allLeaves);        
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

export const addLeave = async(req,res)=>{
    try {
        
        const {empId} = req.body;
        const body = req.body;
        const emp = await Employee.findById(empId);
        const name1 = emp?.name;
        body.name = name1;
        const newLeave = await Leaves.create(body);
        res.status(200).json(newLeave);
    } catch (error) {
        res.status(500).json(error);
    }
    
}

export const approveLeave = async(req,res) =>{
    const { id: _id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Leave unavailable...');
    }
    try {
        const updatedProfile = await Leaves.findByIdAndUpdate( _id, { $set: { 'status': 1 }}, { new: true } )
        res.status(200).json(updatedProfile)
    }catch (error) {
        console.log(error)
        res.status(404).send("Could not change status")
    }
}

export const rejectLeave = async(req,res)=>{
    const { id:_id } = req.params ;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Leave is Unavailable...');
    }

    try {
        const updated = await Leaves.findByIdAndUpdate( _id, { $set: { 'status': -1 }}, { new: true } )
        res.status(200).json(updated);
    } catch (error) {
        res.status(404).json(error);
    }
}

export const leavesbyid = async(req,res)=>{
    try{
    const { empId:empId } = req.params ;
    const allLeaves = await Leaves.find({empId : empId});
    // console.log(allLeaves);
    res.status(200).json(allLeaves);
    }catch(error){
        res.status(500).json(error)
    }
}
