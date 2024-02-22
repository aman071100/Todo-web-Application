exports.errorHandlerMiddleWare = (err, req, res, next) => {

    err.message = err.message || "Server error!";
    err.statusCode = err.statusCode || 500

    // Mongoose duplicate key error
    if (err.code === 11000) {
        err.message = `Duplicate ${Object.keys(err.keyValue)} Entered`;;
        err.statusCode = 400;
    }

    // Wrong Mongodb Id error
    if (err.name === "CastError") {
        err.message = `Resource not found. Invalid: ${err.path}`;
        err.statusCode = 400;
    }

    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        err.message = `Json Web Token is invalid, Try again `;
        err.statusCode = 400;
    }

    // JWT EXPIRE error
    if (err.name === "TokenExpiredError") {
        err.message = `Json Web Token is Expired, Try again `;
        err.statusCode = 400;
    }
    
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })

}