import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from "cors";
import mongoose from "mongoose";
import showPosts from "./Routes/posts.js";
import addPendingOrder from "./Routes/pendingOrders.js";
import auth from "./Routes/users.js"
import errorHandler from './middleware/error.js';
import privateRoute from './Routes/private.js';
import RestaurantSideOrders from './Routes/RestaurantSide.js';
const PORT= process.env.PORT || 5000;
const app=express();
app.use(express.json());
app.use(cors())
app.use('/auth',auth)
app.use('/private',privateRoute)
app.use('/Hotels',showPosts)
app.use('/pendingOrders',addPendingOrder)
app.use('/RestaurantSide',RestaurantSideOrders)
app.use(errorHandler)
const CONNECTION_URI=process.env.MONGO_CONNECTION_URI;
mongoose.connect(CONNECTION_URI,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>{app.listen(PORT,()=>{console.log(`process running on port: ${PORT}`)})})
    .catch((error)=>{console.log(error.message)})