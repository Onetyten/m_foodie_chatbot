import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import path from "path"
import mongoConnect from './config/mongoConnect'
import seedDateRoute from './router/seed/seed.route'
import createUserRoute from './router/createUser.route'
import validateUserRoute from './router/validateUser.route'
import fetchSubcategoryRoute from './router/food/subcategory.route'
import foodListRoute from './router/food/list.route'
import getCustomRoute from './router/food/getCustomisation.route'
import addCartRoute from './router/order/addCart.route'
import fetchCartRoute from './router/order/fetchCart.route'
import deleteCartRoute from './router/order/deleteCart.route'
import createOrderRoute from './router/order/createorder.route'
import verifyHookRoute from './router/order/webhook/verify.route'
import fetchOrderRoute from './router/order/fetchOrder.route'
import verifyPaymentRoute from './router/order/verifyPayment.route'
import deleteOrderRoute from './router/order/deleteOrder.route'
import { Authorization } from './middleware/authorization'

declare module "express-serve-static-core"{
    interface Request{
        userId?:string
    }
}

const app = express()
app.use(cors({origin:"*"}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const environment = process.env.ENVIRONMENT
const rootDir = environment != "dev"?path.join(__dirname,".."):__dirname
app.use(express.static(path.join(rootDir, "client", "dist")));

const port  = process.env.PORT
if (!port) throw new Error ('add a PORT variable to the env file')

    
app.get('/hello',(req,res)=>{
    res.json({message:"hello"})
})



app.use('/data',seedDateRoute)
app.use('/user',createUserRoute)
app.use('/user',validateUserRoute)
app.use('/food',fetchSubcategoryRoute)
app.use('/food',foodListRoute)
app.use('/food',getCustomRoute)
app.use('/webhook', verifyHookRoute)

app.use('/order',Authorization)

app.use('/order', addCartRoute)
app.use('/order', fetchCartRoute)
app.use('/order', deleteCartRoute)
app.use('/order', createOrderRoute)
app.use('/order', fetchOrderRoute)
app.use('/order', verifyPaymentRoute )
app.use('/order', deleteOrderRoute )

app.get(/.*/,(req,res)=>{
    res.sendFile(path.join(rootDir,"client","dist","index.html"))
})


async function startServer(){
    try {
    console.log("Connecting to db")
    await mongoConnect()
    console.log("Connected to db")
    app.listen(port,(error)=>{
        if (!error){
            console.log(`MoriCafe running on port ${port}`)
        }
        else
        {
            console.log(`MoriCafe has run into an error: ${error}`)
        }      
    })
    }
    catch (error) {
        console.log(`Failed to connect to server: ${error}`)
    }
}

// stable
startServer()