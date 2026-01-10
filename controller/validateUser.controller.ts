import { Request, Response } from "express";
import mongoConnect from "../config/mongoConnect";
import User from "../schema/userShema";

export async function validateUser(req:Request,res:Response) {
    await mongoConnect()
    const {user} = req.body
    if (user.length !== 24){
        return res.status(401).json({message:"Invalid user ID",success:false})
    }

    try {
        const checkUser = await User.findById(user)
        if (!checkUser){
            const newUser = await User.create({})
            console.log("New user created")
            return res.status(201).json({message:"User not found, new user created",data:newUser._id,success:true})
        }
        else{
            console.log("New user validated")
            res.status(201).json({message:"New user validated",data:checkUser._id,success:true})
        }
    }
    catch (error) {
        console.log("error creating user", error)
        res.status(500).json({message:"Error creating user",success:false})
    }
}