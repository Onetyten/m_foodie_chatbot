import { Request,Response } from "express";
import Joi from "joi";
import mongoConnect from "../config/mongoConnect";
import Cart from "../schema/cartShema";
import User from "../schema/userShema";
import { tweakType } from "../types/jsonTypes";

const tweakSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  value: Joi.string().required(),
  price: Joi.number().required(),
});

const cartSchema = Joi.object({
  foodId: Joi.string().length(24).hex().required(),
  quantity: Joi.number().integer().min(1).required(),
  customisation: Joi.array().items(tweakSchema).required(),
  totalPrice: Joi.number().integer().min(0).required(),
});

export async function AddToCart(req:Request,res:Response) {
    const {error,value} = cartSchema.validate(req.body);
    if (error){
        console.log("validation error",error);
        return res.status(400).json({message:"validation error",success:false});
    }
    if (!req.userId){
        console.log("no user_id provided",error);
        return res.status(400).json({message:"no user_id provided",success:false});
    }
    const customisation:tweakType[] = value.customisation;
    try {
        await mongoConnect();
        const user = await User.findById(req.userId);
        if (!user){
          console.log("user not found",error);
          return res.status(400).json({message:"user not found",success:false});
        }
        const totalPrice = value.totalPrice + customisation.reduce((sum,tweak)=>sum+tweak.price,0)
        const cart = await Cart.create({userId: req.userId,...value,totalPrice});
        res.status(201).json({message:"Added to cart", success:true,data:cart});
    }
    catch (error) {
        console.log("error adding to cart",error)
        res.status(500).json({message:`error adding to cart: ${error instanceof Error?error.message:""}`,error,success:false})
    }
}