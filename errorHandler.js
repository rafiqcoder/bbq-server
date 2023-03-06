function errorHandler(err,req,res,next) {
    console.log(err);
    // if (res.headersSent) {
    //     return next(err)
    // } 
    res.status(500).send({ error: error.message });

}

module.exports = errorHandler;

// console.log(module);