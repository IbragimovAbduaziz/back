const mongoose = require('mongoose')

const Schema=mongoose.Schema

const Products= new Schema({
   caregory:{
    type:String,
    required:true
   },
   name:{
      type:String,
      required:true
   },
   user_fullname:{
      type:String
   },
   user_id:{
      type:String
   },
   phone:{
      type:String
   },
   amount:{
      type:String,
      requered:true
   },
   volume:{
      type:String,
      required:true
   },
   price:{
      type:Number,
      required:true
   },
   valuta:{
      type:String,
       required:true
   },
   address:{
      type:String,
      required:true
   },
   comment:{
      type:String,
      required:true
   },
   imges:{
      type:String
   },
   status:{
      type:String,
      default:"inactive"
   },
   date:{
      type:Date,
      default:Date.now()
   }
},
   {
      timestamps:true
   }
)

module.exports =mongoose.model("Products", Products)