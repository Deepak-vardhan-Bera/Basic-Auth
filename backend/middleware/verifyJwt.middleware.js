import  jsonwebtoken from "jsonwebtoken";

export const verifyJwt=async(req,res,next)=>{
    const token=req.cookies.token
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    try {
        const decoded=await jsonwebtoken.verify(token,process.env.JWT_SECRET)
        if(!decoded){
           res.status(401).json({success:false,Message:"unauthorized"})
        }
        req.userId=decoded.userId
        console.log(req.userId);
        
        next();
    } catch (error) {
        return res.status(500).json({success:false,Message:"error at verfying jwt",error})
    }
}