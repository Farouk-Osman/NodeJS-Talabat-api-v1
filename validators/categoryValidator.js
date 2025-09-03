const { param, check } = require('express-validator');
const { create } = require('../models/categoryModel');

getCategoryByIdValidator = [
    check('id').isMongoId().withMessage('Invalid category ID'),
    validatorMiddleware
];
updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID"),
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("Category name must be at most 50 characters long"),
  validatorMiddleware,
];

deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category ID'),
    validatorMiddleware
];

createCategoryValidator = [
    check("name")
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ min: 3 })
        .withMessage("Category name must be at least 3 characters long")
        .isLength({ max: 50 })
        .withMessage("Category name must be at most 50 characters long"),
    validatorMiddleware,
];

module.exports = { getCategoryByIdValidator, updateCategoryValidator, deleteCategoryValidator, createCategoryValidator };