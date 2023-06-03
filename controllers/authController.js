const Users=require('../models/UserModel')
const {validationResult}=require('express-validator')
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
require('dotenv').config()

const login_get=(req,res)=>{
    res.send("Login")
}

const login_post=(req,res)=>{
    if(!validationResult(req).isEmpty()){
        res.send(validationResult(req));
    } else {
        const {phone,password}=req.body
        Users.findOne({phone:phone})
        .then((docs)=>{
            if(docs){
                bcrypt.compare(password, docs.password).then(function(result) {
                    if(result){
                        const token=jwt.sign({id:docs.id},process.env.ACCESS_TOKEN,{expiresIn:"1d"})
                        res.cookie("token",token)
                        res.send({
                            messege:"ok",
                            token:token,
                            user:docs
                        })
                    } else {
                        res.status(401).send({
                            messege:"Telefon yoki parol xato"
                        })
                    }
                  });
            } else {
                res.status(401).send({
                    messege:"Bunday foydalanuvchi mavjud emas"
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
}

const register_get=(req,res)=>{
    res.send("Register")
}

const register_post=(req,res)=>{
    if(!validationResult(req).isEmpty()){
        res.send(validationResult(req));
    } else {
        const {phone,password,region,okrug}=req.body
        Users.findOne({phone:phone})
        .then((docs)=>{
            if(docs){
                res.status(401).send({messege:"Bunday foydalanuvchi mavjud"})
            } else {
                  bcrypt.hash(password, 10).then(function(hash) {
                    const user=new Users({
                        phone:phone,
                        password:hash,
                        address:region+","+okrug
                    })
                    user.save()
                    const token=jwt.sign({id:user.id},process.env.ACCESS_TOKEN,{expiresIn:"1d"})
                    res.cookie("token",token)
                    res.status(201).send({
                        messege:"Ro'yxadan o'tingiz",
                        token:token,
                        user:user
                    })
                });                
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

const logout=(req,res)=>{
    res.clearCookie("token")
    res.send("Logout")
}

const dashboard=(req,res)=>{
    console.log(req.user);
    res.send("Dashboard")
}

module.exports = {login_get, login_post, register_get, register_post,logout,dashboard }