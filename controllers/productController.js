const Products=require('../models/ProductModel')

const product_get=(req,res)=>{
    res.send("dsjhdkjahsjdka")
}

const product_get_id=(req,res)=>{
    res.send("Product id")
}

const product_post=(req,res)=>{
    const {category,name,phone,amount,volume,price,valuta,address,comment}=req.body
    res.send("Post")
}

const product_delete=(req,res)=>{
    res.send("Product delete")
}

const product_update=(req,res)=>{
    res.send("Product update")
}
module.exports={product_get,product_get_id,product_post,product_delete,product_update}