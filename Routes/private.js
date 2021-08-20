import express from 'express'
import { getPrivateData } from '../Controllers/private.js'
import { protectUser,protectRestaurant } from '../middleware/auth.js'
const router=express.Router()
router.get('/user',protectUser,getPrivateData)
router.get('/restaurant',protectRestaurant,getPrivateData)
export default router