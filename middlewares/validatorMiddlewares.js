const validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError('Validation error', 400, errors.array()));
    }
    next();
};

module.exports = validatorMiddleware;
