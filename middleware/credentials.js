const allowedOrigins=require('../config/allowed_origins')

const credentilas=(req,res,next)=>{
    const origin=req.headers.allowedOrigins
    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Origin',true)
    }
    next()
}

module.exports=credentilas