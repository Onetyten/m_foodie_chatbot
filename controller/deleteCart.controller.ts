import { Request, Response } from "express";
import mongoConnect from "../config/mongoConnect";
import Joi from "joi";
import Cart from "../schema/cartShema";

const cartSchema = Joi.object({
    id: Joi.string().length(24).hex().required()
})

export async function deleteCart(req:Request,res:Response){
    const {error,value} = cartSchema.validate(req.params)
    if (error) return res.status(400).json({message:`Validation error:${error.message}}`,success:false})
    const id = value.id
    await mongoConnect()
    try {
        const deleted = await Cart.findByIdAndDelete(id)
        if (!deleted){
            return res.status(400).json({message:`Item does not exist`,success:false})
        }
        return res.status(200).json({message:"Message deleted succesfully",success:true})
    }
    catch (error) {
        console.log("error deleting item",error)
        res.status(500).json({message:`error deleting item`,error,success:false})
    }
    
}