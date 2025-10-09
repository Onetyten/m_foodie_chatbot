import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const userSchema = Joi.object({
    userId: Joi.string().length(24).hex().required()
})

export async function Authorization(req:Request,res:Response,next:NextFunction){
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(400).json({message:"No authorization header found",success:false})
    if (!authHeader.startsWith("Bearer")) return res.status(400).json({message:"Invalid Auth format",success:false})
    const userId = authHeader.split(" ")[1]
    const {error} = userSchema.validate({userId})
    if (error) return  res.status(400).json({message:`Validation error:${error.message}}`,success:false})
    req.userId = userId
    next()
}