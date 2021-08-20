import Users from "../models/users.js";
import ErrorResponse from "../utils/errorResponse.js";
export const addUser= async (req,res,next)=>{
    if(req.body){
        try {
        const addUser= req.body
        const newUser= await new Users(addUser)
        await newUser.save((err)=>{
            if(err){
                res.status(500).json('Error in Saving')
            }
            else{
                sendToken(newUser,201,res)
            }
            })
        
    } catch (error) {
        next(error)
    } 

    } else{
        return next(new ErrorResponse("Please Enter all relevant Data",400))
    }
    
    
}

export const login= async (req,res,next)=>{
    const {username,password}=req.body;
    if(!(username && password)){
        return next(new ErrorResponse("Please send username and password",400))
    }
    try{
        const user= await Users.findOne({username}).select("+password")
        if(!user){
            return next(new ErrorResponse("invalid credentials",401))

        }
        const isMatch= await user.matchPasswords(password)
        if(!isMatch){
            return next(new ErrorResponse("invalid credentials",401))

        }else{
            sendToken(user,201,res)
        }
        }
    catch(error){
        next(error)
    }

}
const sendToken=(user,statuscode,res)=>{
    const token=user.signedToken()
    res.status(statuscode).json({success:true,token})
}
export const forgotpassword=()=>{}
export const resetpassword=()=>{}