import { Request,Response } from "express";
// import Joi from "joi";
import mongoConnect from "../config/mongoConnect";
import Food from "../schema/foodSchema";

export async function foodListController(req:Request,res:Response){
    try {
        await mongoConnect()
        const {sub_id,random,q} = req.query
        const query:any = {}
        if (q){
            query.name = {$regex:q as string, $options:"i"}
        }
        if (sub_id){
            query.subCategoryId = sub_id
        }
        if (random=="true"){
            const count= await Food.countDocuments(query)
            const randomIndex = Math.floor(Math.random()*count)
            const randomFood = await Food.findOne(query).skip(randomIndex)
            if (!randomFood){
                console.log("No random food found, menu might be emoty")
                return res.status(400).json({message:"No food found",success:false})
            }
            return res.status(200).json({message:"foods fetched successfully",data:[randomFood],success:true})
        }
        const foodList = await Food.find(query)
        if (foodList.length==0){
            return res.status(404).json({message:`No food found`,success:false})
        }
        res.status(200).json({message:"foods fetched successfully",data:foodList,success:true})
    }
    catch (error) {
        console.log("error fetching food", error)
        res.status(201).json({message:"error fetching food",success:false})
    }
}