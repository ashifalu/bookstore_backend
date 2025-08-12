const jwt = require("jsonwebtoken")

const jwtmiddleware =(req,res,next)=>{
   console.log("inside middleware");
   const token = req.headers["authorization"].slice(7)
   try {
    const jwtRes = jwt.verify(token,process.env.JWT_SECRETKEY)
//    console.log(jwtRes);
    req.payload = jwtRes.userMail  
    next()

   } catch (error) {
    res.status(401).json('Authorisation failed',error)
   }
   
   
}
module.exports = jwtmiddleware