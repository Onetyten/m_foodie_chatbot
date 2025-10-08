import { Request,Response } from "express";
import Joi from "joi";
import mongoConnect from "../config/mongoConnect";
import Food from "../schema/foodSchema";


const listSchema = Joi.object({
    id: Joi.string().length(24).hex().required()
})

export async function foodListController(req:Request,res:Response){
    const {error, value} = listSchema.validate(req.params)
    if (error){
        console.log("validation error",error)
        return res.status(400).json({message:"validation error",success:false})
    }
    const {id} = value
    try {
        await mongoConnect()
        const foodList = await Food.find({subCategoryId:id})
        if (foodList.length==0){
            return res.status(404).json({message:`no food found in this category`,success:false})
        }
        res.status(200).json({message:"foods fetched successfully",data:foodList,success:true})
    }
    catch (error) {
        console.log("error fetching food", error)
        res.status(201).json({message:"error fetching food",success:false})
    }
}