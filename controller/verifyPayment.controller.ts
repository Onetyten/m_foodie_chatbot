import axios from "axios";
import { Request, Response } from "express";
import mongoConnect from "../config/mongoConnect";
import Order from "../schema/orderSchema";
import Joi from "joi";

const requestShema = Joi.object({
    reference: Joi.string().min(16).max(50).required(),
    orderId: Joi.string().length(24).hex().required(),
})

export async function verifyPaymentController(req:Request,res:Response){
    await mongoConnect()
    const {error,value} = requestShema.validate(req.body)

    const userId = req.userId
    const paystackKey = process.env.PAYSTACK_KEY
    if (!paystackKey){
        throw new Error(`No "PAYSTACK_KEY" in the .env file`)
    }

    if (!userId){
        return res.status(401).json({message:"Unauthorized",success:false})
    }

    if (error){
        return res.status(400).json({message:"Invalid reference or orderId ",success:false})
    }

    const {reference,orderId} = value

    try{
        const verifyPayment = await axios.get( `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers:{
                    Authorization: `Bearer ${paystackKey}`
                }
            }
        )
        if(!verifyPayment.data || !verifyPayment.data.status ){
             return res.status(400).json({ message: verifyPayment.data?.message || "Unable to verify payment", success: false })
        }
        const paymentData = verifyPayment.data.data
        if (paymentData.status !== 'success'){
            return res.status(400).json({ message:"Payment not successful",success:false})
        }
        const order = await Order.findOne({_id:orderId,userId,status:"pending"})
        if (!order) {
            return res.status(200).json({message: "Order not found or already completed",success: false })
        }
        
        if (paymentData.amount !== order.total * 100) {
            return res.status(400).json({message: "Incorrect amount paid, your payment has been refunded", success: false })
        }

        if (paymentData.currency !== "NGN") {
            return res.status(400).json({ message: "Payments must be made in Naira, your payment has been refunded", success: false})
        }
        if (paymentData.customer.email !== order.email) {
            return res.status(400).json({ message: "Email mismatch, your payment has been refunded", success: false})
        }
        
        const updatedOrder = await order.updateOne({_id:order._id},{status:"completed",reference,paidAt:new Date()})
        
        return res.status(200).json({ 
            message: "Payment confirmed successfully", 
            success: true,
            data: updatedOrder
        })
    }
    catch(error){
        console.error("Error confirming payment:", error instanceof Error? error.message:"")
        return res.status(500).json({ 
            message: "Error confirming payment", 
            success: false,
            error: error instanceof Error? error.message :"Error confirming payment"
        })

    }
}