const jwt =require('jsonwebtoken')
const User=require('../models/UserModel')
/*
function authentication(req,res,next) {
    const authHeader=req.headers.authorization || req.headers.Authorization
    if(authHeader?.startsWith('Bearer')){
        const token =authHeader.split(' ')[1]
        jwt.verify(token,process.env.ACCESS_TOKEN, async (err,decoded)=>{
            if(err) {
                req.user={}
                return next()
            }
            const user=await User.findById(decoded._id).select({password:0, refresh_token: 0}).exec()
            if(user){
                req.user=user.toObject({getters:true})
            } else {
                req.user={}
            }
            return next()
        })
    } else {
        req.user={}
        return next()
    }
}
*/

function authentication(req,res,next) {
    const token=req.cookies.token
    jwt.verify(token,process.env.ACCESS_TOKEN, async (err,decoded)=>{
        if(err) {
            req.user={}
            return next()
        }
        console.log(decoded);
        const user=await User.findById(decoded.id)
        .then(data=>{
            if(data){
                req.user=data.toObject({getters:true})
            } else {
                req.user={}
            }
        })
        return next()
    })
}
module.exports = {authentication}