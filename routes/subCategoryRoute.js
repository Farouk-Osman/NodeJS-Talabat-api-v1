const express = require('express');
const {
  createSubCategoryValidator,
  getSubCategoryByIdValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require('../utils/validators/subCategoryValidator');


const {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
} = require('../services/subCategoryServices');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    express.json(),
    setCategoryIdToBody,
    createSubCategoryValidator,
    createSubCategory
  )
  .get(getSubCategories);
router
  .route('/:id')
  .get(getSubCategoryByIdValidator, getSubCategoryById)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;