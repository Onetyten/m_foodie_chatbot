import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{type:String, required:true},
    price: {type:Number, required:true},
    available:{type:Boolean,default:true},
    calories:{type:Number},
    imageUrl: {type:String,default:"https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg"},
    category:{type:mongoose.Types.ObjectId, ref:"Category",required:true},
    subCategory:{type:mongoose.Types.ObjectId,ref:"subCategory",required:true},
    customisationId:[{type:mongoose.Types.ObjectId,ref:"Customisation"}]
})

const Food = mongoose.model("Food",foodSchema)
export default Food