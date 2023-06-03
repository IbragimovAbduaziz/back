const {Router} =require('express')
const product=require('../controllers/productController')
const auth=require('../controllers/authController')
const authCookie=require('../middleware/authCookie')
const router=Router()
const {body}=require('express-validator')

router.get('/product',authCookie.authJwt,product.product_get)
router.get('/product:id',authCookie.authJwt,product.product_get_id)
router.post('/product',authCookie.authJwt, product.product_post)

module.exports=router;