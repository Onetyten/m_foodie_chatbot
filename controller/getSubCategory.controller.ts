
import { Request,Response } from "express";
import Joi from "joi";
import mongoConnect from "../config/mongoConnect";
import subCategory from "../schema/subCategory";
import Category from "../schema/categorySchema";

const catSchema = Joi.object({
    category: Joi.string().valid('drink','snack','coffee')
})

export async function getSubController(req:Request,res:Response){
    const {error, value} = catSchema.validate(req.params)
    if (error){
        console.log("validation error")
        return res.status(400).json({message:"validation error",success:false})
    }
    const {category} = value
    try {
        await mongoConnect()
        const categoryId = await Category.findOne({name:category})
        if (!categoryId){
            return res.status(404).json({message:`no categories found for ${category}`,success:false})
        }
        const subCategories = await subCategory.find({categoryId})
        if (subCategories.length==0){
            return res.status(404).json({message:`no categories found for ${category}`,success:false})
        }
        res.status(200).json({message:"subcategories fetched successfully",data:subCategories,success:true})
    }
    catch (error) {
        console.log("error getting subcategory", error)
        res.status(201).json({message:"error getting subcategory",success:false})
    }
    
}