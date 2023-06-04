const jwt =require('jsonwebtoken')
const User=require('../models/UserModel')

function authentication(req,res,next) {
    const authHeader=req.headers.authorization || req.headers.Authorization
    if(authHeader?.startsWith('Bearer')){
        const token =authHeader.split(' ')[1]
        jwt.verify(token,process.env.ACCESS_TOKEN, async (err,decoded)=>{
            if(err) {
                req.user={}
                res.send("Mavjud emas1")
            }
            const user=await User.findById(decoded._id).select({password:0, refresh_token: 0}).exec()
            if(user){
                req.user=user.toObject({getters:true})
                return next()
            } else {
                res.send("Mavjud emas2")
            }
            res.send("Mavjud emas3")
        })
    } else {
        req.user={}
        res.send("Mavjud emas4")
    }
}

module.exports = {authentication}