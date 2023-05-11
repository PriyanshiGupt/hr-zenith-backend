import express from "express";
import { adminlogin } from "../Controllers/admin.js";
const router = express.Router();

router.post('/adminlogin' , adminlogin);

export default router;