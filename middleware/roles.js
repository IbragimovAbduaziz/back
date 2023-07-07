const Role=require('../config/roles')
const Products=require('../models/ProductModel')
const Users=require('../models/UserModel')

const product_delete=(req,res,next)=>{
    const id=req.params.id
    const userId=req.user.id
    let roles=req.user.roles
    let role=req.user.role
    if(roles.includes("productDelete") || role.includes("admin") || role.includes("moderator")){
        roles=true
    } 
    Products.findById(id)
    .then(data=>{
        if(data.user_id==userId || roles==true){
            next()
        } else {
            res.sendStatus(403)
        }
    })
}

const product_update=(req,res,next)=>{
    const id=req.params.id
    const userId=req.user.id
    let roles=req.user.roles
    let role=req.user.role
    if(roles.includes("productDelete") || role.includes("admin") || role.includes("moderator")){
        roles=true
    } 
    Products.findById(id)
    .then(data=>{
        if(data.user_id==userId || roles==true){
            next()
        } else {
            res.sendStatus(403)
        }
    })
}

const user_get=(req,res,next)=>{
    let roles=req.user.roles
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
    if(!req.user.role){
        res.sendStatus(403)
    }
    else if(userId==id ||role.includes("moderator")){
        next()
    }else {
        res.sendStatus(403)
    }

}

const user_delete=(req,res,next)=>{
    const id=req.params.id
    const userId=req.user.id
    let roles=req.user.roles
    let role=req.user.role
    if(!req.user.role){
        res.sendStatus(403)
    }
    else if(userId==id || role.includes("admin") || roles.includes("userDelete")){
        next()
    }else {
        res.sendStatus(403)
    }

}

const user_update=(req,res,next)=>{
    const id=req.params.id
    const userId=req.user.id
    let role=req.user.role
    let roles=req.user.roles
    if(!req.user.role){
        res.sendStatus(403)
    }
    else if(userId==id ||role.includes("admin") || role.includes("moderator") || roles.includes("userUpdate")){
        Users.findById(id)
        .then(data=>{
            let dataRole=data.role
            if(role.includes("admin" || roles.includes("userUpdate"))){
                 if(dataRole.includes("admin") || dataRole.includes("moderator")){
                    res.sendStatus(403)
                } else {
                    next()
                }
            }
            else if(userId==data.id){
                if(req.body.roles || req.body.role){
                    res.sendStatus(403)
                } else {
                    next()
                }
            } else {
                res.sendStatus(403)
            }
        })
    }else {
        res.sendStatus(403)
    }

}

module.exports={product_delete,product_update,user_get,user_get_id,user_delete,user_update}