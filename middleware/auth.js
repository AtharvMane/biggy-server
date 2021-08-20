import jwt from "jsonwebtoken";
import Users from "../models/users.js";
import Restaurant from "../models/restaurants.js";
import ErrorResponse from "../utils/errorResponse.js";

export const protectUser=async(req,res,next)=>{


    let token
    if(req.headers.authorization&& req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1]
    }
    if (!token){
        return next(new ErrorResponse('Not Authorized to this Route', 401))
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user= await Users.findById(decoded.id)
        
        if(!user){
            return next(new ErrorResponse('No user Found with this ID',404))
        }
    next()
    }
    
    catch(err){
        return next(err)
    }
}

export const protectRestaurant=async(req,res,next)=>{


    let token

    if(req.headers.authorization&& req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1]

    }
    if (!token){
        return next(new ErrorResponse('Not Authorized to this Route', 401))
    }
    try{
        const decoded=await jwt.verify(token,process.env.JWT_SECRET)

        const restaurant= await Restaurant.findById(decoded.id)

        if(!restaurant){
            return next(new ErrorResponse('No user Found with this ID',404))
        }
next()
        
        
    
    }
    
    catch(err){
        return next(err)
    }
}