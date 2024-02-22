const jwt = require("jsonwebtoken");

exports.sendToken = (user, req, res, next)=>{
    
   const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '10m' });

   return res.status(201).json({
        success : true,
        message : `Welcome ${user.name}`,
        token 
    })
}