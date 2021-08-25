import mongoose from "mongoose";
const orderSchema=new mongoose.Schema({
    cart: Array,
    restaurant_id:String,
    location:{type:String, required:[true, "Please Provide Location" ]}
})

const Order=mongoose.model('order',orderSchema);
export default Order;