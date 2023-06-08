const Products=require('../models/ProductModel')
const {validationResult}=require('express-validator')

const product_get=(req,res)=>{
    Products.find().then(data=>{
        res.send(data)
    })
    
}

const product_get_id=(req,res)=>{
    const id=req.params.id
    Products.findById(id).then(data=>{
       res.send(data)
    })
    
}

const product_post=(req,res)=>{
    if(!validationResult(req).isEmpty()){
        res.send(validationResult(req));
    } else {
        const {category,name,phone,user_fullname,amount,volume,price,valuta,region,okrug,comment}=req.body
        const product=new Products({
            category:category,
            name:name,
            phone:phone,
            amount:amount,
            volume:volume,
            price:price,
            valuta:valuta,
            address:region+","+okrug,
            comment:comment
        })
        if(req.user){
            const username=req.user
            product.user_fullname=username.fullname
            product.user_id=req.user._id
            product.status="active"
            product.save().then(data=>{
                res.send(data)
            })
        }  
        if(user_fullname && region.user=={}) {
            product.user_fullname=user_fullname
            product.status="inactive"
            product.save().then(data=>{
                res.send(data)
            })
        }
        
                
}
}

const product_delete=(req,res)=>{
    res.send("Product delete")
}

const product_update=(req,res)=>{
    res.send("Product update")
}
module.exports={product_get,product_get_id,product_post,product_delete,product_update}