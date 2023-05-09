import express from "express";
import { addProject, getAllProjects } from "../Controllers/projectDetails.js";
const router = express.Router();

router.get('/getAllProjects' , getAllProjects);
router.post('/addProject' , addProject);
export default router;