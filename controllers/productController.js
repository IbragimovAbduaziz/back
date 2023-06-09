const Products=require('../models/ProductModel')
const {validationResult}=require('express-validator')

const product_get=(req,res)=>{
    Products.find().then(data=>{
        res.send(data)
    })
    
}

const product_get_id=(req,res)=>{
    const id=req.params.id
    Products.findById(id).then(product=>{
       res.send({
        user:req.user,
        product:product
       })
    })
    .catch(err=>{
        res.status(401).send({messege:"Xatolik"})
    })
    
}

const product_post=(req,res)=>{
    if(!validationResult(req).isEmpty()){
        console.log(req.body);
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
        if(req.files) {            
            let path=''
            req.files.forEach(function(files,index,arr){
               path=path+files.path+','
            })
            path=path.substring(0,path.lastIndexOf(","))
            product.imges=path
        } 
        if(req.user){
            const username=req.user
            product.user_fullname=username.fullname
            product.user_id=req.user._id
            product.status="active"
            product.save().then(data=>{
                res.status(201).send(data)
            })
        }  
        if(user_fullname && region.user=={}) {
            product.user_fullname=user_fullname
            product.status="inactive"
            product.save().then(data=>{
                res.status(201).send(data)
            })
        }
        
                
}
}

const product_delete=(req,res)=>{
    const id=req.params.id
    Products.findByIdAndDelete(id)
    .then(()=>{
        res.send({messege:"Ma'lumot o'chirildi"})
    })
    .catch(()=>{
        res.status(401).send({messege:"Xatolik"})
    })
}

const product_update=(req,res)=>{
    const id=req.params.id
    Products.findByIdAndUpdate(id,req.body)
    .then(()=>{
        res.send({messege:"Ma'lumot yangilandi"})
    })
    .catch(()=>{
        res.status(401).send({messege:"Xatolik"})
    })
}
module.exports={product_get,product_get_id,product_post,product_delete,product_update}