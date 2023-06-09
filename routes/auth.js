const {Router} =require('express')
const auth=require('../controllers/authController')
const router=Router()
const {body}=require('express-validator')
const authCookie=require('../middleware/authCookie')

router.get('/login' , auth.login_get)
router.post('/login' ,
[
    body('phone').trim().notEmpty().withMessage("Telfon raqamni kiriting")
    .isLength({min:9,max:20}).withMessage("Telefon raqamni tug'ri kiriting"),
    body('password').trim().notEmpty().withMessage("Parolni kiriting")
    .isLength({min:6}).withMessage("Parolni to'liq kiriting")
],
 auth.login_post)
router.get('/register' , auth.register_get)
router.post('/register',
[
    body('phone').trim().notEmpty().withMessage("Telfon raqamni kiriting")
    .isLength({min:9,max:20}).withMessage("Telefon raqamni tug'ri kiriting"),
    body('password').trim().notEmpty().withMessage("Parolni kiriting")
    .isLength({min:6}).withMessage("Parolni 6-ta belgidan kam bo'lmasin"),
    body('password2').trim().notEmpty().withMessage("Parolni takrorlang")
    .custom((value, {req}) => value === req.body.password).withMessage("Parol tug'ri takrorlang")    
],
auth.register_post)
router.get("/dashboard",authCookie.authentication,auth.dashboard)
router.get('/logout',auth.logout)
router.post('/refresh', auth.refresh)
router.get('/user', authCookie.authentication,auth.user)

module.exports = router;