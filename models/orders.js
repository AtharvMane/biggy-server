import mongoose from "mongoose";
const orderSchema=new mongoose.Schema({
    cart: Array,
    restaurant_id:String
})

const Order=mongoose.model('order',orderSchema);
export default Order;