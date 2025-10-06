import mongoose, { Document } from "mongoose";

export interface categoryType extends Document{
  name:string,
  description:string,
  imageUrl:string
}

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  imageUrl: {type:String,default:"https://t4.ftcdn.net/jpg/01/05/90/77/360_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg"},
});
const Category = mongoose.model<categoryType>("Category",categorySchema)
export default Category
