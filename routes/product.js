const {Router} =require('express')
const product=require('../controllers/productController')
const auth=require('../controllers/authController')
const authCookie=require('../middleware/authCookie')
const router=Router()
const {body}=require('express-validator')
const multer=require('multer')
const path=require('path')
const fs=require('fs');


var storages=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './upload')
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+"_"+file.originalname);
    },
})

var uploads=multer({
    storage:storages, 
    fileFilter:function(req,file,next){
        if(
            file.mimetype=="image/png" ||
            file.mimetype=="image/jpg" ||
            file.mimetype=="image/jpeg"
        ){
            next(null,true)
        } else {
            next(null,false)
        }
    }   
})

router.get('/product',authCookie.authentication,product.product_get)
router.get('/product/:id',authCookie.authentication,product.product_get_id)
router.post('/product',authCookie.authentication,uploads.array('imges',5),[
    body('category').notEmpty().withMessage('Categoriyani tanlang'),
    body('name').notEmpty().withMessage('Maxsulot nomini kiriting'),
    body('phone').notEmpty().withMessage("Telfon raqamni kiriting")
    .isLength({min:9,max:20}).withMessage("Telefon raqamni tug'ri kiriting"),
    body('amount').notEmpty().withMessage('Maxsulot hajmini kiriting'),
    body('volume').notEmpty().withMessage('Maxsulot miqdorini kiriting'),
    body('price').notEmpty().withMessage('Maxsulot narxini kiriting'),
    body('valuta').notEmpty().withMessage('Pul birligini kiriting'),
    body('region').notEmpty().withMessage('Viloyatni kiriting'),
    body('okrug').notEmpty().withMessage('Tumani kiriting')
], product.product_post)
router.delete('/product/:id',authCookie.authentication,product.product_delete)
router.put('/product/:id',authCookie.authentication,product.product_update)

module.exports=router;