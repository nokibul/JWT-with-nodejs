const JWT = require("jsonwebtoken");

module.exports = async (req,res,next)=>{
    const token = await req.header("x-auth-token");

    if(!token){
        return res.status(400).json({
            "errors": [
                {
                    "msg": "No token found",
                }
            ]
        })
    }

    try{
        const user = await JWT.verify(token,"randomplaintext")
        req.user = user.email;
        next();
    }catch(err){
        return res.status(400).json({
            "errors": [
                {
                    "msg": "No match",
                }
            ]
        })
    }  
}