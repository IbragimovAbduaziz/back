const Products=require('../models/ProductModel')
const {validationResult}=require('express-validator')
const Categoriya=require('../config/categoriya')
const path=require('path')
const fs=require('fs')

const category=(req,res)=>{
    res.send(Categoriya)
} 

const productall_get=(req,res)=>{
    Products.find().then(data=>{
        res.send(data)
    })    
}

const product_get=(req,res)=>{
    let active=[]
    Products.find().then(data=>{
        data.forEach(e=>{
            if(e.status=="active"){
                active.push(e)
            }
        })
        res.send(active)
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
            status:"active"
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

const  product_delete= async (req,res)=>{
    const id=req.params.id
    const del= await pdelete(id)
    if(del){
        res.send({messege:"Ma'lumot o'chirildi"})
    } else {
        res.status(401).send({messege:"Xatolik"})
    }
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


module.exports={category,productall_get,product_get,product_get_id,product_user_id,product_post,product_delete,product_update}

function pdelete(id){
    Products.findById(id)
    .then(data=>{
        let imgs=data.imges.split(",")
        imgs.forEach(e=>{
            let img=e.slice(7)
            if(fs.existsSync(path.join(__dirname,"../upload/",img))){
                console.log("okk");
                fs.rmSync(path.join(__dirname,"../upload/",img))
            }
        })
        Products.findByIdAndDelete(id)
        .then(()=>{
            return true
        })
        .catch(()=>{
           return false
        })
    })
    .catch(err=>{
        return false
    })
}