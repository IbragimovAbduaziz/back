const Products=require('../models/ProductModel')
const {validationResult}=require('express-validator')

const product_get=(req,res)=>{
    res.send("dsjhdkjahsjdka")
}

const product_get_id=(req,res)=>{
    res.send("Product id")
}

const product_post=(req,res)=>{
    if(!validationResult(req).isEmpty()){
        res.send(validationResult(req));
    } else {
        const {category,name,phone,user,amount,volume,price,valuta,region,okrug,comment}=req.body
        const product=new Products({
            caregory:category,
            name:name,
            phone:phone,
            amount:amount,
            volume:volume,
            price:price,
            valuta:valuta,
            address:region+","+okrug,
            commnet:comment
        })
        if(req.user){
            const username=req.user
            product.user_fullname=username.fullname
            product.user_id=req.user._id
        }  
        if(user) {
            product.user_fullname=user
        }

        product.seve()
    }    
}

const product_delete=(req,res)=>{
    res.send("Product delete")
}

const product_update=(req,res)=>{
    res.send("Product update")
}
module.exports={product_get,product_get_id,product_post,product_delete,product_update}