import express from "express";
import { addReport, getProjectReports } from "../Controllers/projectReports.js";
const router = express.Router();

router.get('/getProjectReports' , getProjectReports);
router.post('/addReport' , addReport);
export default router;