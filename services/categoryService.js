const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const categoryModel = require('../models/categoryModel');

const createCategory = asyncHandler(async (req, res) => {
    name = req.body.name;
    if (!name) {
        res.status(400);
        throw new Error('Category name is required');
    }
    const category = await categoryModel.create({
        name,
        slug: slugify(name)
    });
    res.status(201).json({
        status: 'success',
        data: category
    });
});

const getCategories = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const categories = await categoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({
        status: 'success',
        results: categories.length,
        page,
        data: categories
    });
});

const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new Error('Category name is required');
    }
    const category = await categoryModel.findByIdAndUpdate(id, {
        name,
        slug: slugify(name)
    }, { new: true });
    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }
    res.status(200).json({
        status: 'success',
        data: category
    });
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }
    res.status(204).json({
        status: 'success',
        data: null
    });
});

const getCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }
    res.status(200).json({
        status: 'success',
        data: category
    });
});
module.exports = {createCategory , getCategories, updateCategory, deleteCategory, getCategoryById};