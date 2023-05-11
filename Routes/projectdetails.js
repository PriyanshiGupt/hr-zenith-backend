import express from "express";
import { addProject, getAllProjects, projectDetailsById } from "../Controllers/projectDetails.js";
const router = express.Router();

router.get('/getAllProjects' , getAllProjects);
router.post('/addProject' , addProject);
router.get('/projectDetailsbyId/:empId',projectDetailsById);
export default router;