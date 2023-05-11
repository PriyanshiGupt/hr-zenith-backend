import mongoose from "mongoose";
import Transactions from "../Model/Transactions.js";

export const getAllTransactions = async(req, res) => {
    try {
        const allTransactions = await Transactions.find();
        res.status(200).json(allTransactions);        
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

export const transactionDetailsbyid = async(req,res)=>{
    try{
    const { empId:empId } = req.params ;
    const alltransactions = await Transactions.find({empId : empId});
    // console.log(allLeaves);
    res.status(200).json(alltransactions);
    }catch(error){
        res.status(500).json(error)
    }
}