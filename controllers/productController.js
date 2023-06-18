const Products=require('../models/ProductModel')
const {validationResult}=require('express-validator')
const Categoriya=require('../config/categoriya')

const categoriya=(req,res)=>{
    res.send(Categoriya)
}

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

const product_user_id=(req,res)=>{
    const id=req.params.id
    Products.find({user_id:id}).then(product=>{
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
        const {category,name,phone,amount,volume,price,valuta,region,okrug,comment}=req.body
        const product=new Products({
            category:category,
            name:name,
            phone:phone,
            amount:amount,
            volume:volume,
            price:price,
            valuta:valuta,
            address:region+","+okrug,
            comment:comment,
            user_fullname:req.user.fullname,
            user_id:req.user._id,
            status:"active",
            roles:"getId"
        })
        if(req.files) {            
            let path=''
            req.files.forEach(function(files,index,arr){
               path=path+files.path+','
            })
            path=path.substring(0,path.lastIndexOf(","))
            product.imges=path
        }  
        product.save().then(data=>{
        res.status(201).send(data)
        })                
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


module.exports={categoriya,product_get,product_get_id,product_user_id,product_post,product_delete,product_update}