import jwt from "jsonwebtoken"

const adminmiddleware=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login again"})
    }
    try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        req.body.adminId=token_decode.id;
        next();
    }catch(error){
        console.log(error);
        res.json({sucess:false,message:"Error"})
    }
}

export default adminmiddleware