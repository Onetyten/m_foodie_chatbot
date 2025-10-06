import mongoose, { Document } from "mongoose";

export interface customisationType extends Document{
    name:string,
    type:string,
    options: [{ label: string, extraPrice: number }],
    quantity:{
        min:number,
        max:number,
        size:number
    }
}

const customisationSchema = new mongoose.Schema({
    name:{type:String},
    type:{type:String,enum:["option","check","quantity"]},
    options: [{ label:{type:String}, extraPrice:{type:Number}}],
    quantity:{
        min:{type:Number,default:0},
        max:{type:Number,default:5},
        size:{type:Number,default:1}
    }
})

const Customisation = mongoose.model<customisationType>("Customisation",customisationSchema)
export default Customisation