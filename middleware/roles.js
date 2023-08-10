const Role=require('../config/roles')
const Products=require('../models/ProductModel')
const Users=require('../models/UserModel')

const productall_get=(req,res,next)=>{
    let role=req.user.role
        if(!role){
            res.sendStatus(403)
        }
        else if(role.includes("moderator")){
            next()
        } else {
            res.sendStatus(403)
        }
}

const product_delete=(req,res,next)=>{
    const id=req.params.id
    const userId=req.user.id
    let role=req.user.role
    Products.findById(id)
    .then(data=>{
        if(data.user_id==userId || role.includes("moderator")){
            next()
        } else {
            res.sendStatus(403)
        }
    })
}

const product_update=(req,res,next)=>{
    const id=req.params.id
    const userId=req.user.id
    let role=req.user.role
    Products.findById(id)
    .then(data=>{
        if(data.user_id==userId || role.includes("moderator")){
            next()
        } else {
            res.sendStatus(403)
        }
    })
}

const user_get=(req,res,next)=>{
    let role=req.user.role
    if(!req.user.role){
        res.sendStatus(403)
    } 
    else if(role.includes("moderator")){
        next()
    } else {
        res.sendStatus(403)
    }
}

const user_get_id=(req,res,next)=>{
    const id=req.params.id
    const userId=req.user.id
    let role=req.user.role
    if(userId==id ||role.includes("moderator")){
        next()
    }else {
        res.sendStatus(403)
    }

}

const user_delete=(req,res,next)=>{
    const id=req.params.id
    const userId=req.user.id
    let role=req.user.role
    if(userId==id || role.includes("admin")){
        next()
    }else {
        res.sendStatus(403)
    }

}

const user_update=(req,res,next)=>{
    const id=req.params.id
    const userId=req.user.id
    let role=req.user.role    
    if(userId==id || role.includes("admin")){
        next()
    }else {
        res.sendStatus(403)
    }
}

module.exports={productall_get,product_delete,product_update,user_get,user_get_id,user_delete,user_update}