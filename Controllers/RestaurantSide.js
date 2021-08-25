import Order from "../models/orders.js";
import Restaurant from "../models/restaurants.js";

import ErrorResponse from "../utils/errorResponse.js";
import jwt from 'jsonwebtoken'


export const orderSent= async (req,res,next)=>{
    try {

        const sentOrder= req.body

        await Order.deleteOne(sentOrder)

        
    } catch (error) {
        return next(error)
    }}


export const getOrder= async (req,res,next)=>{
    try {
        
        const order= await Order.find({'restaurant_id': req.headers.restaurant_id});
        res.json(order);
        res.status(200);
    } catch (error) {
        return next(new ErrorResponse('Error Occured in getting order',500))
    }
}

export const addRestaurant= async (req,res,next)=>{
    if(req.body){
        try {
    
            const addRestaurant= req.body
            const newRestaurant= new Restaurant(addRestaurant)
            newRestaurant.score=0;
            await newRestaurant.save((err)=>{
                if(err){
                    return next(err)
                }
                else{
                    restaurantLogin(req,res,next)
                }
                })

        
    } catch (error) {
        next(error)
    } 

    } else{
        return next(new ErrorResponse("Please Enter all relevant Data",400))
    }
    
    
}
export const restaurantLogin= async (req,res,next)=>{
    const {email,password}=req.body;
    if(!(email && password)){
        return next(new ErrorResponse("Please send username and password",400))
    }
    try{
        const restaurant= await Restaurant.findOne({email}).select("+password")
        if(!restaurant){
            return next(new ErrorResponse("invalid credentials",401))

        }
        const isMatch= await restaurant.matchPasswords(password)
        if(!isMatch){
            return next(new ErrorResponse("invalid credentials",401))

        }else{
            sendToken(restaurant,201,res)
        }
        }
    catch(error){
        next(error)
    }

}

export const addMenuItem=async(req,res,next)=>{
    let token
    console.log(req.body)
    if(req.headers.authorization&& req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1]
    }
    if (!token){
        return next(new ErrorResponse('Not Authorized to this Route', 401))
    }else{
        try{
        const decoded= await jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.id===req.body._id){

            
            const restaurant=await Restaurant.findById(decoded.id)
            
            if(restaurant.menu){restaurant.menu.push({id:restaurant.menu.length,name:req.body.addToMenu, cost:req.body.cost})}else{restaurant.menu=[req.body.addToMenu]}
            restaurant.save((err)=>{
                if(err){
                    return next(new ErrorResponse("Error occured while saving the Menu",500))
                }else{
                    res.status(201).json({success:true, message: "menu saved successfully"})
                }
            })
        }else{
            return next(new ErrorResponse("Not Auth to change menu",401))
        } 
        }catch(err){
            return next(err)
        }
       
        
        
    }
    }
    
    

    


const sendToken=(user,statuscode,res)=>{
    const token=user.signedToken()
    res.status(statuscode).json({success:true,token,id:user._id})
}