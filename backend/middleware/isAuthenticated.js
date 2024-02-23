const jwt = require("jsonwebtoken");
const User = require("../modals/user");
const errorHandler = require("../utils/errorCustomClass");
const { catchAsyncFun } = require("./asyncFun");

exports.isAuthenticated = catchAsyncFun(async(req, res, next)=>{

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
   
    const encodedToken = jwt.verify(token, process.env.SECRET_KEY)
    req.user = encodedToken;
    const validUser = await User.findById(req.user.userId)

    if(!validUser){
        return next(new errorHandler("Not authorized.", 401 ))
    }
    next();
})