exports.catchAsyncFun = (processingFun)=>(req, res, next)=>{

    Promise.resolve(processingFun(req, res, next)).catch(next);

}