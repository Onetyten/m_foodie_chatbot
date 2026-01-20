import dotenv from 'dotenv'
dotenv.config()
import { Request,Response } from "express";
import mongoConnect from "../config/mongoConnect";
import { cartListType, orderType } from "../types/jsonTypes";
import OrderItem from "../schema/orderItemShema";
import Cart from "../schema/cartShema";
import { OrderSchema } from "../validation/orderValidation";
import Order from "../schema/orderSchema";
import axios, { isAxiosError } from 'axios';





export async function OrderController(req:Request,res:Response){
    const paystackKey = process.env.PAYSTACK_KEY
    if (!paystackKey){
        throw new Error("No PAYSTACK_KEY env variable found")
    }

    const {error,value} = OrderSchema.validate(req.body)
    const isMobile  = req.query.isMobile === 'true'

    if (error) return res.status(400).json({message:`Validation error:${error.message}`,success:false})
    console.log(error)

    const userId = req.userId
    if (!userId) {
        console.log("No user id found")
        return res.status(401).json({message:`No user id found`,success:false})
    }

    if (!value.items || value.items.length===0) {
        console.log("Your order is empty, please order something.")
        return res.status(401).json({message:`Your order is empty, please order something.`,success:false})
    }

    try {
        await mongoConnect()
        const cartItems:cartListType[] = value.items
        const createdOrderItemsId = []
        for (const item of cartItems){
            const originCart = await Cart.findByIdAndDelete(item._id)
            if (!originCart) continue
            const newCartItem = await OrderItem.create({
                foodId:originCart?.foodId,
                quantity:item.quantity,
                priceAtPurchase:originCart?.totalPrice,
                customisation:originCart?.customisation
            })
            createdOrderItemsId.push(newCartItem._id)
            console.log("new cart order created")
        }
        const email = value.email.toLowerCase()
        const callback_url = process.env.CALLBACK_URL
        const total  = cartItems.reduce((sum,item)=>sum+(item.totalPrice*item.quantity),0)
        let data = {}
        
        if (!isMobile){
            const payParams = {
            email: email,
            amount: total*100,
            callback_url
            }

            const paystack_response = await axios.post('https://api.paystack.co/transaction/initialize',payParams,{
            headers: {
                Authorization: `Bearer ${paystackKey}`,
                'Content-Type': 'application/json'
            }
            })
            const result = paystack_response.data
            const newOrder = await Order.create({
                userId,
                items: createdOrderItemsId,
                name:value.name,
                email,
                address:value.address,
                reference:result.data.reference,
                access_code: result.data.access_code,
                payment_url: result.data.authorization_url,
                phone_number:value.phone_number,
                total
            })
            data = {orderId:newOrder._id,email, amount:total, authorization_url: result.data.authorization_url, reference: result.data.reference}
        }
        else{
            const newOrder = await Order.create({
                userId,
                items: createdOrderItemsId,
                name:value.name,
                email,
                address:value.address,
                phone_number:value.phone_number,
                total
            })
            data = {orderId:newOrder._id,email, amount:total,}
        }
        console.log("order created")
        return res.status(201).json({message:'Order created successfully',success:true,data})

    }
    
    catch (error) {
        if (isAxiosError(error)){
            console.error(error.response?.data)
            return res.status(500).json({message:`Payment initialization failed`,error:error.message,success:false})
        }
        console.error("error creating order",error)
        return res.status(500).json({message:`error creating order : ${error instanceof Error?error.message:""}`,success:false})

    }
}






