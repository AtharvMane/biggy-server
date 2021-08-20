import express from "express";
import { getRestaurant,getRestaurantfromID } from "../Controllers/posts.js";
const router=express.Router()
router.get('/',getRestaurant)
router.get('/:id',getRestaurantfromID)

export default router;