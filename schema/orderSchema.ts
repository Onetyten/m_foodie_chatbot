import mongoose, { Document } from "mongoose";

export interface orderType extends Document{
    userId:mongoose.Types.ObjectId,
    status:string,
    items: mongoose.Types.ObjectId[],
    placedAt:Date,
    paidAt:Date,
    name:string,
    reference:string,
    payment_url:string,
    access_code:string,
    email:string,
    address:string,
    phone_number:string,
    total:number 
}


const orderSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,ref:"User"},
    status:{type:String,enum:["pending","completed","canceled"],default:"pending"},
    items: [{ type: mongoose.Types.ObjectId, ref: "OrderItem",required:true }],
    placedAt:{type:Date,default:Date.now},
    paidAt:{type:Date},
    name:{type:String,required:true},
    reference:{type:String},
    payment_url:{type:String},
    access_code:{type:String},
    email:{type:String,required:true},
    address:{type:String,required:true},
    phone_number:{type:String,required:true},
    total:{type:Number, required:true,default:0},
})

const Order = mongoose.model<orderType>("Order",orderSchema)
export default Order