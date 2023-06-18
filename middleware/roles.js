const Role=require('../config/roles')
const Products=require('../models/ProductModel')
const Users=require('../models/UserModel')

const product_delete=(req,res,next)=>{
    const id=req.params.id
    const userId=req.user.id
    let role=req.user.roles
    if(role.includes("productDelete")){
        role=true
    } 
    Products.findById(id)
    .then(data=>{
        if(data.user_id==userId || role==true){
            next()
        } else {
            res.sendStatus(403)
        }
    })
}

const product_update=(req,res,next)=>{
    const id=req.params.id
    const userId=req.user.id
    let role=req.user.roles
    if(role.includes("productUpdate")){
        role=true
    } 
    Products.findById(id)
    .then(data=>{
        if(data.user_id==userId || role==true){
            next()
        } else {
            res.sendStatus(403)
        }
    })
}

const user_get=(req,res,next)=>{
    let role=req.user.roles
    if(role.includes('userView')){
        next()
    } else {
        res.sendStatus(403)
    }
}

const user_get_id=(req,res,next)=>{
    const id=req.params.id
    const userId=req.user.id
    let role=req.user.roles

    if(userId==id || role.includes("userViewId")){
        next()
    }else {
        res.sendStatus(403)
    }

}

const user_delete=(req,res,next)=>{
    const id=req.params.id
    const userId=req.user.id
    let role=req.user.roles

    if(userId==id || role.includes("userDelete")){
        next()
    }else {
        res.sendStatus(403)
    }

}

const user_update=(req,res,next)=>{
    const id=req.params.id
    const userId=req.user.id
    let role=req.user.roles

    if(userId==id || role.includes("userUpdate")){
        next()
    }else {
        res.sendStatus(403)
    }

}

module.exports={product_delete,product_update,user_get,user_get_id,user_delete,user_update}