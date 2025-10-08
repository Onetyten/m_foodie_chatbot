import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import path from "path"
import mongoConnect from './config/mongoConnect'
import seedDateRoute from './router/seed/seed.route'
import createUserRoute from './router/createUser.route'

const app = express()
app.use(cors({origin:"*"}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const rootDir = __dirname.includes("dist")?path.join(__dirname,".."):__dirname

const port  = process.env.PORT
if (!port) throw new Error ('add a PORT variable to the env file')

    
app.get('/hello',(req,res)=>{
    res.json({message:"hello"})
})

app.use('/data',seedDateRoute)
app.use('/user',createUserRoute)


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

startServer()