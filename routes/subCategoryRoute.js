const express = require('express');
const {
  createSubCategoryValidator,
  getSubCategoryByIdValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require('../validators/subCategoryValidator');

const router = express.Router();

const {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} = require('../services/subCategoryServices');

router
  .route('/')
  .post(createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);
router
  .route('/:id')
  .get(getSubCategoryByIdValidator, getSubCategoryById)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;