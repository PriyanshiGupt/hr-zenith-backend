// import mongoose from "mongoose";
import admin from "../Model/admin.js";
// import bcrypt from 'bcryptjs'
export const adminlogin = async(req,res)=>{
    try {
        console.log("Hi Admin");
        const {userName , password} = req.body;
        const isAdmin = await admin.findOne({userName});
        if(!isAdmin){
            res.status(400).json("UserName AndOr Password Has Not Been Recorgnized");
            return;
         }
         const isPasswordCorrect = (password == isAdmin.password);
         if(!isPasswordCorrect){
             res.status(300).json("UserName AndOr Password Has Not Been Recorgnized");
             return;
         }
        res.status(202).json("Admin Login Sucessfull");
    } catch (error) {
        console.log("Catched");
        res.status(404).json(error)
    }
}
