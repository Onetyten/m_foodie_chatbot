import mongoose,{Document} from "mongoose";

export interface FoodType extends Document {
  name: string;
  price: number;
  available: boolean;
  calories?: number;
  imageUrl: string;
  categoryId: mongoose.Types.ObjectId;
  subCategoryId: mongoose.Types.ObjectId;
  customisationId: mongoose.Types.ObjectId[];
}

const foodSchema = new mongoose.Schema({
    name:{type:String, required:true},
    price: {type:Number, required:true},
    available:{type:Boolean,default:true},
    calories:{type:Number},
    imageUrl: {type:String,default:"https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg"},
    categoryId:{type:mongoose.Types.ObjectId, ref:"Category",required:true},
    subCategoryId:{type:mongoose.Types.ObjectId,ref:"subCategory",required:true},
    customisationId:[{type:mongoose.Types.ObjectId,ref:"Customisation"}]
})

const Food = mongoose.model<FoodType>("Food",foodSchema)
export default Food