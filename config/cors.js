const allowedOrigins=require('./allowed_origins')

const corsOptions={
    origin:(origin,callback)=>{
        console.log(origin);
        if(allowedOrigins.includes(origin) || !origin){
            callback(null,true)
        } else {
            callback(new Error("Not allowed by cors"))
        }
    }
}
module.exports=corsOptions