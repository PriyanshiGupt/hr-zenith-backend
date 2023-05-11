import express from "express";
import {addLeave, approveLeave, getAllLeaves, leavesbyid, rejectLeave } from "../Controllers/leaves.js";
const router = express.Router();

router.get('/getAllLeaves' , getAllLeaves);
router.post('/addLeave' , addLeave);
router.patch('/approveLeave/:id' , approveLeave);
router.patch('/rejectLeave/:id' , rejectLeave);
router.get('/leavesbyid/:empId' ,leavesbyid )
export default router;