const express =require('express')
const cors =require('cors')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
require('dotenv').config()
const corsOptions=require('./config/cors')
const bodyParser=require('body-parser')

const app=express()

const auth=require('./routes/auth')
const product=require('./routes/product')
const credentals=require('./middleware/credentials')
const errorHandler=require('./middleware/error_handler')

const PORT=process.env.PORT

const DBURI=process.env.DBURI;

app.use(credentals)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(auth)
app.use(product)
app.use(errorHandler)

app.all("*", (req,res)=>{
  res.status(404)
  if(req.accepts('json')){
    res.json({'error':'404 Not Found'})
  } else {
    res.type('text').send('404 Not Found')
  }
})

mongoose.connect(DBURI)
  .then((result)=>app.listen(PORT, ()=>{
    console.log("server running");
  }))
  .catch((err)=>console.log(err))

