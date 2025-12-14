import dotenv from 'dotenv'
dotenv.config()
import { Request, Response } from "express";
import crypto from 'crypto'
import Order from '../../schema/orderSchema';
import mongoConnect from '../../config/mongoConnect';


export async function verifyPaymentController (req:Request,res:Response){
    try {
        await mongoConnect()
        const paystackKey = process.env.PAYSTACK_KEY
        if (!paystackKey) throw new Error("PAYSTACK_KEY variable not found, add it to the .env")
        const signature = req.headers["x-paystack-signature"] as string
        const hash = crypto.createHmac("sha512",paystackKey).update(JSON.stringify(req.body)).digest("hex")
        
        if (hash !== signature){
            console.log("invalid signature")
            return res.sendStatus(400)
        }

        const event = req.body
        console.log("webhook event received: ",event.event)
        if (event.event === "charge.success"){
            const reference = event.data.reference
            const email = event.data.customer?.email
            console.log(event.data)

            const paidOrder = await Order.findOneAndUpdate({email,reference,status:"pending"},{status:"completed",paidAt:new Date()},{new:true})
            if (paidOrder) {
                console.log("Order payment confirmed:", paidOrder._id);
            }
            else {
                console.log("No pending order found for reference:", reference);
            }
        }
        res.sendStatus(200)
    }
    catch (error) {
        console.error("Error verifying payment ", error);
        res.sendStatus(500)    
    }
}