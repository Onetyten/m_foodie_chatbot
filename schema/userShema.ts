import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    cart:[{
        foodId:{type: mongoose.Schema.Types.ObjectId, ref:"Food"},
        quantity:{type:Number, default:1},
        customisation:[{
            name:{type:String},
            type:{type:String},
            value:{type:String},
        }],
    }],
    moneySpent:{type:Number,default:0}
})

const User = mongoose.model('User',userSchema)
export default User


    