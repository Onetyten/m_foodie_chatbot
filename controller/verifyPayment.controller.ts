import axios from "axios";
import { Request, Response } from "express";
import mongoConnect from "../config/mongoConnect";
import Order from "../schema/orderSchema";


export async function verifyPaymentController(req:Request,res:Response){
    await mongoConnect()
    const {reference} = req.body
    const userId = req.userId
    const paystackKey = process.env.PAYSTACK_KEY
    if (!paystackKey){
        throw new Error(`No "PAYSTACK_KEY" in the .env file`)
    }

    if (!userId){
        return res.status(401).json({message:"Unauthorized",success:false})
    }
    if (!reference){
        res.status(400).json({message:"No reference provided",success:false})
    }
    try{
        const verifyPayment = await axios.get( `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers:{
                    Authorization: `Bearer ${paystackKey}}`
                }
            }
        )
        const paymentData = await verifyPayment.data.data
        if (paymentData.status !== 'success'){
            return res.status(400).json({ message:"Payment not successful",success:false})
        }
        const paidOrder = await Order.findOneAndUpdate({reference,userId,status:"pending"},{status:"completed",paidAt:new Date()},{new:true})
        if (!paidOrder) {
            return res.status(200).json({message: "Order not found or already completed",success: false })
        }
        
        return res.status(200).json({ 
            message: "Payment confirmed successfully", 
            success: true,
            data: paidOrder
        })
    }
    catch(error){
        console.error("Error confirming payment:", error)
        return res.status(500).json({ 
            message: "Error confirming payment", 
            success: false 
        })

    }
}