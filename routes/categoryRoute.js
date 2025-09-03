const express = require('express');
const { body, param, validationResult } = require('express-validator');

const router = express.Router();

const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../services/categoryService');

router.route('/')
    .post(createCategory)
    .get(getCategories);
router.route('/:id')
    .get(param('id').isMongoId().withMessage('Invalid category ID'),(req,res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ApiError('Validation error', 400, errors.array()));
        }
        getCategoryById(req, res, next);
    })
    .put(param('id').isMongoId().withMessage('Invalid category ID'),(req,res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ApiError('Validation error', 400, errors.array()));
        }
        updateCategory(req, res, next);
    })
    .delete(param('id').isMongoId().withMessage('Invalid category ID'),(req,res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ApiError('Validation error', 400, errors.array()));
        }
        deleteCategory(req, res, next);
    });
module.exports = router;