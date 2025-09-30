import dotenv from 'dotenv'
dotenv.config()
import express from 'express'


const app = express()

const port  = process.env.PORT
if (!port) throw new Error ('add a PORT variable to the env file')


app.listen(port,()=>{
    console.log(`Mbot running on port ${port}`)
})