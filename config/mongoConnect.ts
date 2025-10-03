import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose";
import { Mongoose } from "mongoose";

const mongoUrl = process.env.MONGO_URL
if (!mongoUrl){
    throw new Error("No Mongodb connection string found, please add one to the env file")
}

interface cachedConnnection{
    conn: Mongoose | null,
    promise: Promise<Mongoose> | null
}

declare global{
    var mongoose:cachedConnnection
}

let cachedConnnection = globalThis.mongoose

if (!cachedConnnection){
    cachedConnnection = globalThis.mongoose = {conn:null,promise:null}
}

async function mongoConnect() {
    if (cachedConnnection.conn){
        console.log("Found cached connection")
        return cachedConnnection.conn
    }
    if (!cachedConnnection.promise){
        const opts = {
            bufferCommands:false
        }
        cachedConnnection.promise = mongoose.connect(mongoUrl as string,opts).then((mongoose)=>{
            return mongoose
        })
    }
    cachedConnnection.conn = await cachedConnnection.promise
    return cachedConnnection.conn
}

export default mongoConnect