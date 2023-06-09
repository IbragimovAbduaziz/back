const Users=require('../models/UserModel')
const {validationResult}=require('express-validator')
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
require('dotenv').config()

async function login_get(req,res){
    res.send("Login")
}

async function login_post(req,res){
    if(!validationResult(req).isEmpty()){
        res.send(validationResult(req));
    } else {
        const {phone,password}=req.body
        Users.findOne({phone:phone})
        .then((docs)=>{
            if(docs){
                bcrypt.compare(password, docs.password).then(function(result) {
                    if(result){
                        const token=jwt.sign({id:docs.id},process.env.ACCESS_TOKEN,{expiresIn:"1800s"})
                        const refreshToken=jwt.sign({id:docs.id},process.env.REFRESH_TOKEN,{expiresIn:"1d"})
                        docs.refresh_token=refreshToken
                        docs.save()
                        res.cookie("refresh_token",refreshToken,{maxAge: 900000,httpOnly:true,sameSite:"none"})
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

async function register_get(req,res){
    res.send("Register")
}

async function register_post(req,res){
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
                    const token=jwt.sign({id:user.id},process.env.ACCESS_TOKEN,{expiresIn:"1800s"})
                    const refreshToken=jwt.sign({id:user.id},process.env.REFRESH_TOKEN,{expiresIn:"1d"})
                    user.refresh_token=refreshToken
                    res.cookie("refresh_token",refreshToken,{maxAge: 900000,httpOnly:true,sameSite:"none",secure:true})
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

async function logout(req,res){
    const cookies=req.cookies

    if(!cookies.refresh_token) return res.sendStatus(204)

    const refreshToken=cookies.refresh_token
    const user=await Users.findOne({refresh_token:refreshToken})

    if(!user){
        res.clearCookie("refresh_token", {httpOnly:true, sameSite:"none",secure:true})
        return res.sendStatus(204)
    }
    user.refresh_token=null
    await user.save()

    res.clearCookie("refresh_token", {httpOnly:true, sameSite:"none",secure:true})
    res.sendStatus(204)
}

async function dashboard(req,res){
    res.send({user:req.user})
}

async function refresh(req,res){
    const cookies=req.cookies
    if(!cookies.refresh_token) return res.sendStatus(401)

    const refreshToken=cookies.refresh_token

    const user=await Users.findOne({refresh_token:refreshToken})
    if(!user) return res.sendStatus(403)
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        (err,decoded)=>{
            if(err || user._id!=decoded.id) return res.sendStatus(403)
            const accessToken=jwt.sign(
                {_id:decoded.id},
                process.env.ACCESS_TOKEN,
                {expiresIn:'1800s'}
            )

            res.json({access_token:accessToken})
        }
    )
}

async function user(req,res){
    const user=req.user
    res.send(user)
}

module.exports = {login_get,login_post,register_get,register_post,logout,dashboard,refresh,user}