import { Request,Response } from "express";
import mongoConnect from "../config/mongoConnect";
import Order from "../schema/orderSchema";

export async function fetchOrderController(req:Request,res:Response) {
    console.log("fetching orders")
    const userId = req.userId
    const {references} =  (req.body || {}) as  { references?: string[] }
    try {
        await mongoConnect()
        if (references && references.length>0){
            const fetchedOrders = await Order.find({ userId, reference: { $in: references } }).populate({path: "items", populate: { path: "foodId", model: "Food", select: "name price imageUrl calories",}})
            return res.status(200).json({message:'orders fetched',success:true , data:fetchedOrders })
        }
        const fetchedOrders = await Order.find({ userId}).populate({path: "items", populate: { path: "foodId", model: "Food", select: "name price imageUrl calories",}})
        return res.status(200).json({message:'orders fetched',success:true , data:fetchedOrders })

    }
    catch (error) {
        console.log("error getting orders",error)
        res.status(500).json({message:`Internal server error`,error,success:false})
    }
}