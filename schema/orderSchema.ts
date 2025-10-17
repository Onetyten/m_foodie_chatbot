import { required } from "joi";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,ref:"User"},
    status:{type:String,enum:["pending","completed","canceled"],default:"pending"},
    items: [{ type: mongoose.Types.ObjectId, ref: "OrderItem" }],
    placedAt:{type:Date,default:Date.now},
    paidAt:{type:Date},
    name:{type:String,required:true},
    reference:{type:String,required:true},
    payment_url:{type:String,required:true},
    access_code:{type:String,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    phone_number:{type:String,required:true},
    total:{type:Number, required:true}
})

const Order = mongoose.model("Order",orderSchema)
export default Order