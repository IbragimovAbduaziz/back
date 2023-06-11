const express=require("express")
const router=express.Router()
const authCookie=require('../middleware/authCookie')
const Products=require('../models/ProductModel')
const multer=require('multer')
const path=require('path')
const fs=require('fs');


var storages=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './upload')
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+"_"+file.originalname);
    },
})

var uploads=multer({
    storage:storages, 
    fileFilter:function(req,file,next){
        if(
            file.mimetype=="image/png" ||
            file.mimetype=="image/jpg" ||
            file.mimetype=="image/jpeg"
        ){
            next(null,true)
        } else {
            next(null,false)
        }
    }   
})

router.put("/img/:id",authCookie.authentication,uploads.array('imges'),(req,res)=>{
    const id=req.params.id
    if(req.user.fullname){
        Products.findById(id)
        .then(data=>{
            let images={imges:data.imges}
            if(req.files) {            
                let path=''
                req.files.forEach(function(files,index,arr){
                   path=path+files.path+','
                })
                path=path.substring(0,path.lastIndexOf(","))
                images.imges+=path
            }     
            Products.findByIdAndUpdate(id,images)
            .then(()=>{
                res.send({messege:"Rasm yangilandi"})
            })
            .catch(()=>{
                res.status(401).send({messege:"Xatolik"})
            })     
        })
    } else{
        res.send({messege:"xatolik"})
    }
})
module.exports=router