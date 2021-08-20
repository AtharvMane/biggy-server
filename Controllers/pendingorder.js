import Order from "../models/orders.js";
import ErrorResponse from "../utils/errorResponse.js"
export const addPendingOrder= async (req,res,next)=>{
    try {
        const addPendingOrder= req.body
        const newOrder= new Order(addPendingOrder)
        newOrder.save((err)=>{
            if(err){
                return next(new ErrorResponse("Some error occured in placing the Order please try again",500))
            }
            else{
                res.status(201).json({success:true,message:"Order Placed Successfully"})
            }
            })
        
    } catch (error) {
        return next(error)
    }
}