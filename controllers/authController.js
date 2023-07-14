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
                        const token=jwt.sign({id:docs.id},process.env.ACCESS_TOKEN,{expiresIn:"7d"})
                        docs.save()
                        res.send({
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
        const {fullname,phone,password,region,okrug}=req.body
        Users.findOne({phone:phone})
        .then((docs)=>{
            if(docs){
                res.status(401).send({messege:"Bunday foydalanuvchi mavjud"})
            } else {
                  bcrypt.hash(password, 10).then(function(hash) {
                    const user=new Users({
                        fullname:fullname,
                        phone:phone,
                        password:hash,
                        address:region+","+okrug
                    })
                    user.save()
                    const token=jwt.sign({id:user.id},process.env.ACCESS_TOKEN,{expiresIn:"7d"})
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

    if(!cookies.token) return res.sendStatus(204)

    res.clearCookie("token", {httpOnly:true, sameSite:"none",secure:true})
    res.sendStatus(204)
}

async function dashboard(req,res){
    res.send({user:req.user})
}

async function user(req,res){
    const user=req.user
    res.send(user)
}

async function users(req,res){
    Users.find()
    .then(data=>{
        res.send(data)
    })
}

async function user_id(req,res){
    const id=req.params.id
    Users.findById(id)
    .then(data=>{
        res.send(data)
    })
}

const user_delete=(req,res)=>{
    Users.findByIdAndDelete(req.params.id).then((blog) => {
        if (!blog) {
            return res.status(404).send();
        }
        res.send(blog);
    }).catch((error) => {
        res.status(500).send(error);
    })

}

async function user_update(req,res){
    const id=req.params.id
    if(req.body.phone){
        let tel=req.body.phone
        if(tel.startsWith("+") && tel.length==13){
            let tel= await Users.findOne({phone:req.body.phone})
            if(tel==null){
                Users.findByIdAndUpdate(id,req.body)
                .then(()=>{
                    res.send({messege:"Ma'lumot yangilandi"})
                })
                .catch(()=>{
                    res.status(401).send({messege:"Xatolik"})
                })
            } else {
                res.sendStatus(304)
            }
        }
    } else {
        if(req.body.password){
            await bcrypt.hash(req.body.password, 10).then(function(hash) {
                req.body.password=hash
            })
        }
        Users.findByIdAndUpdate(id,req.body)
        .then(()=>{
            res.send({messege:"Ma'lumot yangilandi"})
        })
        .catch(()=>{
            res.status(401).send({messege:"Xatolik"})
        })
    }
    
}

module.exports = {login_get,login_post,register_get,register_post,logout,dashboard,user,users,user_id,user_delete,user_update}