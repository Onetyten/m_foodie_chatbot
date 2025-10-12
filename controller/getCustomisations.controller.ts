import { Request,Response } from "express";
import Joi from "joi"; 
import mongoConnect from "../config/mongoConnect";
import Customisation from "../schema/customisationSchema";

const custSchema = Joi.object({
    customisationId:Joi.array().items(Joi.string().length(24).hex()).default([])
})


export async function getFoodCustomisations(req:Request,res:Response) {
    const {error, value} = custSchema.validate(req.body)
    if (error){
        console.log("validation error",error)
        return res.status(400).json({message:"validation error",success:false})
    }
    const {customisationId} = value
    try {
        await mongoConnect()
        const allCustomisations = await Customisation.find({
            _id: { $in: customisationId }
        })
        if (!allCustomisations.length){
            return res.status(404).json({message: "No customisations found", success: false })
        }
        return res.status(200).json({message:"customisations fetched",data:allCustomisations,success:true})
        
    }
    catch (error) {
        console.log("error fetching customisations",error)
        res.status(500).json({message:`error fetching customisations : ${error instanceof Error?error.message:""}`,error,success:false})
    }
}