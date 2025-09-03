const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Handle path-to-regexp TypeError
    if (err instanceof TypeError && err.message.includes('path-to-regexp')) {
        err.statusCode = 400;
        err.message = 'Invalid route parameter format';
    }

    // Different error response for development vs production
    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            error: err,
            stack: err.stack
        });
    } else {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
};

module.exports = globalErrorHandler;
