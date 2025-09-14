/* eslint-disable new-cap */
/* eslint-disable node/no-missing-require */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const brandModel = require('../models/brand');
const ApiError = require('../utils/apiError');
const apiFeatures = require('../utils/apiFeatures');

const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new ApiError('Brand name is required', 400);
  }

  // Generate unique filename for the image
  const filename = req.file
    ? `brand-${uuidv4()}-${Date.now()}.jpeg`
    : 'default-brand.jpeg';

  if (req.file) {
    // Image processing
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/brands/${filename}`);
  }

  // Create brand with processed image
  const brand = await brandModel.create({
    name,
    slug: slugify(name),
    image: req.file
      ? `uploads/brands/${filename}`
      : 'uploads/brands/default-brand.jpeg',
  });

  res.status(201).json({
    status: 'success',
    data: {
      brand,
    },
  });
});

const getBrands = asyncHandler(async (req, res) => {
  const apiFeature = new apiFeatures(brandModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const brands = await apiFeature.mongooseQuery;
  res.status(200).json({
    status: 'success',
    results: brands.length,
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

const getBrandById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const brand = await brandModel.findById(id);
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

module.exports = {
  createBrand,
  getBrands,
  updateBrand,
  getBrandById,
  deleteBrand,
};