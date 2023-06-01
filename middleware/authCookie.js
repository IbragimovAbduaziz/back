const jwt =require('jsonwebtoken')

const authJwt=(req,res,next)=>{
    const token = req.cookies.token
    try {
        const user=jwt.verify(token, process.env.ACCESS_TOKEN)
        req.user=user;
        next()
    } catch (error) {
        res.clearCookie("token")
        res.send("user not")
    }
}
module.exports={authJwt}