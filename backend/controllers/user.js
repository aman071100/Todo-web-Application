const bcrypt = require("bcrypt")
const { catchAsyncFun } = require("../middleware/asyncFun");
const User = require("../modals/user");
// const ErrorHandler = require("../utils/errorCustomClass");
const { sendToken } = require("../utils/webToken");
const sendEmail = require("../utils/sendMail");
const ErrorHandler = require("../utils/errorCustomClass");
const { AllHttpCode } = require("../utils/allStatusCode");

// @desc GET USER PROFILE 
// @desc GET METHOD
exports.createUser = catchAsyncFun(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new ErrorHandler("All fields are required!", AllHttpCode.All_Fields_Required))
    };

    const allReadyExist = await User.findOne({ email: email })

    if (allReadyExist) {
        return next(new ErrorHandler("This email is already exist.", AllHttpCode.Already_Exist))

    }
    const hashedPass = await bcrypt.hash(password, 12);

    const user = await User.create({
        name,
        email,
        password: hashedPass,
    });
    return res.status(200).json({
        success: true,
        message: "User created successfully."
    })
});

// @desc LOGIN USER
// @desc POST METHOD
exports.loginUser = catchAsyncFun(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("All fields are required!", AllHttpCode.All_Fields_Required))
    };

    const user = await User.findOne({ email: email }).select("+password")

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", AllHttpCode.Invalid))
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return next(new ErrorHandler("Invalid email or password", AllHttpCode.Invalid))
    }

    sendToken(user, req, res, next);
});

// @desc Forgot USER password
// @desc POST METHOD
exports.forgotPassword = catchAsyncFun(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new ErrorHandler("Email is required!", AllHttpCode.All_Fields_Required))
    };

    const user = await User.findOne({ email: email })

    if (!user) {
        return next(new ErrorHandler("Invalid email!", AllHttpCode.Invalid))
    }

    const options = {
        email,
        subject: "For reset password.",
        message: `http://localhost:3000/reset/${user?._id}`
    }
    sendEmail(options)

    res.status(200).json({
        success: true,
        message: `To reset for password a link has been send on ${user.email} mail`
    })
});

// @desc RESET USER password
// @desc PATCH METHOD
exports.resetPassword = catchAsyncFun(async (req, res, next) => {
    const id = req.params.id;
    const { password } = req.body;

    console.log(id)

    const hashedPass = await bcrypt.hash(password, 12);

    const user = await User.findByIdAndUpdate(
        id,
        {
            password: hashedPass
        })

    console.log(user)
    res.status(200).json({
        success: true,
        message: "Password has been updated successfully."
    })
});

