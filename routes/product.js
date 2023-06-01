const {Router} =require('express')
const product=require('../controllers/productController')
const router=Router()

router.get('/product', product.product_get)
router.get('/product:id',product.product_get_id)
router.post('/product', product.product_post)

module.exports=router;