import express from "express";
import { getOrder,orderSent, addRestaurant, restaurantLogin, addMenuItem } from "../Controllers/RestaurantSide.js";
const router=express.Router()
router.post('/register',addRestaurant)
router.post('/login',restaurantLogin)
router.post('/menu/addMenu',addMenuItem)
router.post('/orders/setOrders',orderSent)
router.get('/orders/getOrders',getOrder)


export default router;