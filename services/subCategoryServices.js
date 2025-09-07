const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const subCategoryModel = require('../models/subCategory');
const ApiError = require('../utils/apiError');

const createSubCategory = asyncHandler(async (req, res) => {
    const { name, category } = req.body;
    if (!name || !category) {
        res.status(400);
        throw new ApiError('SubCategory name and category are required', 400);
    }
    const subCategory = await subCategoryModel.create({
        name,
        slug: slugify(name),
        category,
    });
    res.status(201).json({
        status: 'success',
        data: subCategory,
    });
});

const getSubCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = (page - 1) * limit;
  const filter = req.params.categoryId
    ? { category: req.params.categoryId }
    : {};
  const subCategories = await subCategoryModel
    .find(filter)
    .skip(skip)
    .limit(limit)
    .populate({ path: 'category', select: 'name' });
  res.status(200).json({
    status: 'success',
    results: subCategories.length,
    page,
    data: subCategories,
  });
});

const updateSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category } = req.body;
  if (!name || !category) {
    res.status(400);
    throw new ApiError('SubCategory name and category are required', 400);
  }
  const subCategory = await subCategoryModel.findByIdAndUpdate(
    id,
    {
      name,
      slug: slugify(name),
      category,
    },
    { new: true }
  );
  if (!subCategory) {
    res.status(404);
    throw new ApiError('SubCategory not found', 404);
  }
  res.status(200).json({
    status: 'success',
    data: subCategory,
  });
});

const deleteSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subCategory = await subCategoryModel.findByIdAndDelete(id);
  if (!subCategory) {
    res.status(404);
    throw new ApiError('SubCategory not found', 404);
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const getSubCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subCategory = await subCategoryModel
    .findById(id)
    .populate({ path: 'category', select: 'name' });
  if (!subCategory) {
    res.status(404);
    throw new ApiError('SubCategory not found', 404);
  }
  res.status(200).json({
    status: 'success',
    data: subCategory,
  });
});

module.exports = {
    createSubCategory,
    getSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory,
};