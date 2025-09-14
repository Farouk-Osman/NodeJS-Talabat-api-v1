/* eslint-disable new-cap */
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const categoryModel = require('../models/categoryModel');
const ApiError = require('../utils/apiError');
const apiFeatures = require('../utils/apiFeatures');

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new ApiError('Category name is required', 400);
  }
  const category = await categoryModel.create({
    name,
    slug: slugify(name),
  });
  res.status(201).json({
    status: 'success',
    data: category,
  });
});

const getCategories = asyncHandler(async (req, res) => {
  const apiFeature = new apiFeatures(categoryModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const { mongooseQuery, paginationResult } = apiFeature;
  const categories = await mongooseQuery;
  res.status(200).json({
    status: 'success',
    results: categories.length,
    pagination: paginationResult,
    data: {
      categories
    }
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new ApiError('Category name is required', 400);
  }
  const category = await categoryModel.findByIdAndUpdate(
    id,
    {
      name,
      slug: slugify(name),
    },
    { new: true }
  );
  if (!category) {
    res.status(404);
    throw new ApiError('Category not found', 404);
  }
  res.status(200).json({
    status: 'success',
    data: category,
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);
  if (!category) {
    res.status(404);
    throw new ApiError('Category not found', 404);
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  if (!category) {
    res.status(404);
    throw new ApiError('Category not found', 404);
  }
  res.status(200).json({
    status: 'success',
    data: category,
  });
});
module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoryById,
};
