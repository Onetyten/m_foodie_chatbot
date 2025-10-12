import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,ref:"User"},
    status:{type:String,enum:["pending","completed","canceled"],default:"pending"},
    items:[
        {
            FoodId:{type:mongoose.Types.ObjectId,ref:"Food"},
            quantity:{type:Number, default:1},
            priceAtPurchase:{type:Number},
            customisation:[{
                name:{type:String},
                type:{type:String},
                value:{type:String},
            }],
        }],
    placedAt:{type:Date,default:Date.now},
    paidAt:{type:Date},
    total:{type:Number, required:true}
})
const Order = mongoose.model("Order",orderSchema)
export default Order
