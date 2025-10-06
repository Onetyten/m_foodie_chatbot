import mongoose, { Document } from "mongoose";
export interface subCategoryType extends Document{
  name: string,
  categoryId:mongoose.Types.ObjectId,
  imageUrl:string,
}

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true},
  categoryId: {type:mongoose.Types.ObjectId, ref:"Category"},
  imageUrl: {type:String,default:"https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg"},
});
const subCategory = mongoose.model<subCategoryType>("subCategory",subCategorySchema)
export default subCategory
