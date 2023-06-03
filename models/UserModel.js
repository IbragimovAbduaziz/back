const mongoose = require('mongoose')

const Schema=mongoose.Schema

const Users= new Schema({
    fullname:{
        type:[String]
    },
    phone:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:[String]
    },
    date:{
        type:String,
        default:Date.now()
    },
    refresh_token:String
},
{
    timestamps:true
}
)

module.exports =mongoose.model("Users", Users)