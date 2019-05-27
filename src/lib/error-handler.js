
const errorHandler = ( res, statusCode = 500, err ) => {
    if (!res.headersSent) {
        res.status(statusCode);
    }
    
    if (statusCode < 500 ) {
        res.send(err.getMessage());
        return;
    } 
    
    console.log(err);

    res.send('Oops! Something went wrong. Please try again later.');
}

module.exports = errorHandler;
