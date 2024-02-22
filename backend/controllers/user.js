const bcrypt = require("bcrypt")
const { catchAsyncFun } = require("../middleware/asyncFun");
const User = require("../modals/user");
const errorHandler = require("../utils/errorCustomClass");
const { sendToken } = require("../utils/webToken");
const sendEmail = require("../utils/sendMail");

// @desc GET USER PROFILE 
// @desc GET METHOD
exports.createUser = catchAsyncFun( async(req, res, next)=>{
    const {name, email, password} = req.body;

    if( !name || !email || !password){
        return next(new errorHandler("All fields are required!", 401))
    };

    const allReadyExist = await User.findOne({email : email})

    if(allReadyExist){
        return next(new errorHandler("This emil is already exist.", 401))

    }
    const hashedPass = await bcrypt.hash(password, 12);

    const user = await User.create({
        name,
        email,
        password : hashedPass,
    });
    return res.status(200).json({
        success : true,
        message : "User created successfully."
    })
});

// @desc LOGIN USER
// @desc POST METHOD
exports.loginUser = catchAsyncFun( async(req, res, next)=>{
    const {email, password} = req.body;

    if( !email || !password){
        return next(new errorHandler("All fields are required!", 401))
    };

    const user = await User.findOne({email : email}).select("+password")

    if(!user){
        return next(new errorHandler("Invalid email or password"), 401)
    }

    const valid = await bcrypt.compare(password, user.password);

    if(!valid){
        return next(new errorHandler("Invalid email or password"), 401)
    }

    sendToken(user, req, res, next);
});

// @desc Forgot USER password
// @desc POST METHOD
exports.forgotPassword = catchAsyncFun( async(req, res, next)=>{
    const {email} = req.body;

    if( !email){
        return next(new errorHandler("Email is required!", 401))
    };

    const user = await User.findOne({email : email})

    if(!user){
        return next(new errorHandler("Invalid email!"), 401)
    }

    const options = {
        email,
        subject : "For reset password.",
        message : "ufhh"
    }
    sendEmail(options)

    res.status(200).json({
        success: true,
        message : `To reset for password a link has been send on ${user.email} mail`
    })
});

// @desc RESET USER password
// @desc PATCH METHOD
exports.resetPassword = catchAsyncFun( async(req, res, next)=>{
    const id = req.param.id;
    const password = req.body;

    const hashedPass = await bcrypt.hash(password, 12);

    const user = await User.findByIdAndUpdate({_id:id},{
        password : hashedPass
    })

    res.status(200).json({
        success: true,
        message : "Password has been updated successfully."
    })
});

