const Products=require('../models/ProductModel')

const product_get=(req,res)=>{
    res.send("dsjhdkjahsjdka")
}

const product_get_id=(req,res)=>{
    res.send("Product id")
}

async function product_post(req,res){
    const {category,name,phone,user,amount,volume,price,valuta,region,okrug,comment}=req.body
    const product=new Products({
        caregory:category,
        name:name,
        amount:amount,
        volume:volume,
        price:price,
        valuta:valuta,
        address:region+","+okrug,
        commnet:comment
    })
    if(phone){
       product.phone=phone
    } 
    if(req.user){
        product.user_fullname=req.user.fullname.toString()
        product.user_id=req.user._id
    }  
    if(user) {
        product.user_fullname=user
    }
    
    res.send(product)
    
}

const product_delete=(req,res)=>{
    res.send("Product delete")
}

const product_update=(req,res)=>{
    res.send("Product update")
}
module.exports={product_get,product_get_id,product_post,product_delete,product_update}