import Restaurant from "../models/restaurants.js";
export const getRestaurant= async (req,res)=>{
    try {
        const getRestaurant= await Restaurant.find();
        const getRestaurants= getRestaurant.map((e)=>{e.password="lol What do you take me for?? A Noob?"; return e})
        res.json(getRestaurants);
        res.status(200);
    } catch (error) {
        res.status(500).json({error:'Some error occured'})
    }
}
export const getRestaurantfromID= async (req,res)=>{
    try {
        
        const getRestaurant= await Restaurant.findById(req.params.id)
        getRestaurant.password="Yeah Better luck next time Mr.HaCkEr"
        res.json([getRestaurant]);
        res.status(200);
    } catch (error) {
        res.status(500).json({error:'Some error occured'})
    }
}