const express =require('express')
const cors =require('cors')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
require('dotenv').config()

const app=express()

const auth=require('./routes/auth')
const product=require('./routes/product')

const PORT=process.env.PORT

const DBURI=process.env.DBURI;

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials:true
}))
app.use(auth)
app.use(product)


mongoose.connect(DBURI)
  .then((result)=>app.listen(PORT, ()=>{
    console.log("server running");
  }))
  .catch((err)=>console.log(err))

