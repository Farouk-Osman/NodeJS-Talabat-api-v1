const express = require('express');
const { body, param, validationResult } = require('express-validator');
const {getCategoryByIdValidator, updateCategoryValidator, deleteCategoryValidator, createCategoryValidator} = require('../validators/categoryValidator');
const router = express.Router();

const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../services/categoryService');

router.route('/')
    .post(createCategoryValidator, createCategory)
    .get(getCategories);
router.route('/:id')
    .get(getCategoryByIdValidator, getCategoryById)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;