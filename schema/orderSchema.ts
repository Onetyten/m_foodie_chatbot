import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,ref:"User"},
    status:{type:String,enum:["pending","completed","canceled"],default:"pending"},
    items: [{ type: mongoose.Types.ObjectId, ref: "OrderItem" }],
    placedAt:{type:Date,default:Date.now},
    paidAt:{type:Date},
    total:{type:Number, required:true}
})
const Order = mongoose.model("Order",orderSchema)
export default Order
