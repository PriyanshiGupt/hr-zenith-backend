import express from "express";
import {getAllTransactions, transactionDetailsbyid } from "../Controllers/transactions.js";
const router = express.Router();

router.get('/getAllTransactions' , getAllTransactions);
router.get('/transactionDetailsById/:empId',transactionDetailsbyid);
// router.post('/addReport' , addReport);
export default router;