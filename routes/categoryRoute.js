const express = require('express');

const router = express.Router();

const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../services/categoryService');

router.route('/')
    .post(createCategory)
    .get(getCategories)
    .put(updateCategory)
    .delete(deleteCategory);
router.route('/:id')
    .get(getCategoryById);
module.exports = router;