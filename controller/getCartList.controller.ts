import { Request,Response } from "express";
import mongoConnect from "../config/mongoConnect";
import Cart from "../schema/cartShema";


export async function getCartList(req:Request,res:Response){
    const userId = req.userId
    if (!userId){
        console.log("No userId")
        return res.status(400).json({message:"No userId",success:false})
    }
    try {
        await mongoConnect()
        const cartList = await Cart.find({userId}).select("_id quantity totalPrice").populate({path:"foodId",select:["name","imageUrl"]})
        console.log("cart fetched")
        return res.status(200).json({message:"cart fetched",data:cartList,success:true})
    }
    catch (error) {
        console.log("error getting cart",error)
        res.status(500).json({message:`Internal server error`,error,success:false})
    }
}