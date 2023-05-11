import express from "express";
import { getAllEmployee , addEmployee, approveEmployee, rejectEmployee, detailsbyid, updateSalary, login, addSalary, clockin, clockout } from "../Controllers/employee.js";
const router = express.Router();


router.get('/getAllEmployee' , getAllEmployee);
router.get('/detailsbyid/:id', detailsbyid);
router.post('/addEmployee' , addEmployee);  
router.patch('/approveEmployee/:id', approveEmployee);
router.patch('/rejectEmployee/:id', rejectEmployee);
router.patch('/updateSalary/:id' , updateSalary);
router.post('/addSalary', addSalary)
router.post('/login' , login);
router.patch('/clockin' , clockin)
router.patch('/clockout' , clockout)
export default router;