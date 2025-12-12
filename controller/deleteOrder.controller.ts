import { Request, Response } from "express";
import Joi from "joi";
import mongoConnect from "../config/mongoConnect";
import Order from "../schema/orderSchema";
import OrderItem from "../schema/orderItemShema";


const paramSchema = Joi.object({
    id: Joi.string().length(24).hex().required()
})

export default async function deleteOrderController(req:Request,res:Response){
    const {error,value} = paramSchema.validate(req.params)
    const userId = req.userId

    if (!userId) {
        console.log("No user id found")
        return res.status(401).json({message:`UnAuthorized`,success:false})
    }
    if (error){
        console.log("No order id provided in params")
        return res.status(400).json({message:`Invalid order id`,success:false})
    }
    const orderId = value.id
    try {
        await mongoConnect()
        const order  = await Order.findOne({ _id:orderId, userId})
        if (!order){
            return res.status(404).json({message:`Order does not exist`,success:false})
        }

        await OrderItem.deleteMany({_id :{$in:order.items}})
        await Order.findByIdAndDelete(orderId)
        
        return res.status(200).json({message:"Order deleted succesfully",success:true})
    }
    catch (error) {
        return res.status(500).json({message:`Error deleting order`,success:false})
    }

}