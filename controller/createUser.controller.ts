import { Request, Response } from "express";
import mongoConnect from "../config/mongoConnect";
import User from "../schema/userShema";

export async function createNewUser(req:Request,res:Response) {
    await mongoConnect()
    try {
       const newUser = await User.create({})
       console.log("New user created")
       res.status(201).json({message:"New user created",data:newUser._id,success:true})
    }
    catch (error) {
        console.log("error creating user", error)
        res.status(201).json({message:"Error creating user",success:false})
    }
}