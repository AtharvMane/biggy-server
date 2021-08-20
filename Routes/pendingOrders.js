import express from "express";
import { addPendingOrder } from "../Controllers/pendingorder.js";
const router=express.Router()
router.post('/',addPendingOrder)

export default router;