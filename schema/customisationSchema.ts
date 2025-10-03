import mongoose from "mongoose";

const customisationSchema = new mongoose.Schema({
    name:{type:String},
    type:{type:String,enum:["option","check","quantity"]},
    options: [{ label: String, extraPrice: Number }],
    quantity:{
        min:{type:Number,default:0},
        max:{type:Number,default:5},
        size:{type:Number,default:1}
    }
})

const Customisation = mongoose.model("Customisation",customisationSchema)
export default Customisation