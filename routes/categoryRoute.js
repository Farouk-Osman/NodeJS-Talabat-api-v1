const express = require('express');
const subCategoryRoute = require('./subCategoryRoute');
const {
  getCategoryByIdValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
  createCategoryValidator,
} = require('../validators/categoryValidator');

const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../services/categoryService');

// Nested route for subcategories
router.use('/:categoryId/subcategories', subCategoryRoute);

// Category routes

router
  .route('/')
  .post(createCategoryValidator, createCategory)
  .get(getCategories);
router
  .route('/:id')
  .get(getCategoryByIdValidator, getCategoryById)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
