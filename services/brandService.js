const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const brandModel = require('../models/brand');
const ApiError = require('../utils/apiError');

const createBrand = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new ApiError('Brand name is required', 400);
    }
    const brand = await brandModel.create({
        name,
        slug: slugify(name),
        image: req.file.path,
    });
    res.status(201).json({
        status: 'success',
        data: {
            brand,
        },
    });
});

const getBrands = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const skip = (page - 1) * limit;
    const brands = await brandModel.find({}).skip(skip).limit(limit);
    res.status(200).json({
        status: 'success',
        results: brands.length,
        page,
        data: brands,
    });
});

const updateBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new ApiError('Brand name is required', 400);
    }
    const brand = await brandModel.findByIdAndUpdate(
        id,
        {
            name,
            slug: slugify(name),
            image: req.file.path,
        },
        { new: true }
    );
    if (!brand) {
        res.status(404);
        throw new ApiError('Brand not found', 404);
    }
    res.status(200).json({
        status: 'success',
        data: {
            brand,
        },
    });
});


const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const brand = await brandModel.findByIdAndDelete(id);
    if (!brand) {
        res.status(404);
        throw new ApiError('Brand not found', 404);
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
});


module.exports = {
    createBrand,
    getBrands,
    updateBrand,
    deleteBrand,
};