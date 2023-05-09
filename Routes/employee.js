import express from "express";
import { getAllEmployee , addEmployee, approveEmployee, rejectEmployee, detailsbyid, updateSalary } from "../Controllers/employee.js";
const router = express.Router();


router.get('/getAllEmployee' , getAllEmployee);
router.get('/detailsbyid/:id', detailsbyid);
router.post('/addEmployee' , addEmployee);  
router.patch('/approveEmployee/:id', approveEmployee);
router.patch('/rejectEmployee/:id', rejectEmployee);
router.patch('/updateSalary/:id' , updateSalary);


export default router;