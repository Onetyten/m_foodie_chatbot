import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    foodId:{type: mongoose.Schema.Types.ObjectId, ref:"Food"},
    quantity:{type:Number, default:1},
    customisation:[{
        name:{type:String},
        type:{type:String},
        value:{type:String},
        price:{type:Number},
    }],
    totalPrice:{type:Number}
})

const Cart = mongoose.model('Cart',cartSchema)
export default Cart


    