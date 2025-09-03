const express = require('express');
const { body, param, validationResult } = require('express-validator');
const ApiError = require('../utils/apiError');
const validatorMiddleware = require('../middlewares/validatorMiddlewares');
const router = express.Router();

const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../services/categoryService');

router.route('/')
    .post(createCategory)
    .get(getCategories);
router.route('/:id')
    .get(param('id').isMongoId().withMessage('Invalid category ID'), validatorMiddleware, getCategoryById)
    .put(param('id').isMongoId().withMessage('Invalid category ID'), validatorMiddleware, updateCategory)
    .delete(param('id').isMongoId().withMessage('Invalid category ID'), validatorMiddleware, deleteCategory);
module.exports = router;