/* eslint-disable node/no-missing-require */
/* eslint-disable import/no-unresolved */
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const productModel = require('../models/productModel');
const ApiError = require('../utils/apiError');

const createProduct = asyncHandler(async (req, res) => {
    const { title, description, price, category, subcategories, brand, quantity } = req.body;
    if (!title || !description || !price || !category || !brand || !quantity) {
        throw new ApiError('Please provide all required fields', 400);
    }

    // Generate unique filename for the image cover
    const imageCoverFilename = req.file
        ? `product-${uuidv4()}-${Date.now()}.jpeg`
        : 'default-product.jpeg';
    const imagesFilenames = req.files && req.files.length > 0
        ? req.files.map((file, index) => `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`)
        : ['default-product.jpeg'];
    if (req.file) {
        // Image processing for cover image
        await sharp(req.file.buffer)
            .resize(800, 800)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/products/${imageCoverFilename}`);
    }
    if (req.files && req.files.length > 0) {
        // Image processing for additional images
        await Promise.all(req.files.map((file, index) =>
            sharp(file.buffer)
                .resize(800, 800)
                .toFormat('jpeg')
                .jpeg({ quality: 95 })
                .toFile(`uploads/products/${imagesFilenames[index]}`)
        ));
    }
    // Create product in the database
    const product = await productModel.create({
        title,
        slug: slugify(title),
        description,
        price,
        category,
        subcategories,
        brand,
        imageCover: imageCoverFilename,
        images: imagesFilenames,
        quantity
    });

    res.status(201).json({
        status: 'success',
        data: {
            product
        }
    });

    res.status(201).json({
        status: 'success',
        data: {
            product
        }
    });
});


const getProducts = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const products = await productModel.find({}).skip(skip).limit(limit).populate('category brand subcategories');
    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    });
});
const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await productModel.findById(id).populate('category brand subcategories');
    if (!product) {
        res.status(404);
        throw new ApiError('Product not found', 404);
    }
    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, price, category, subcategories, brand, quantity } = req.body;
    const product = await productModel.findById(id);
    if (!product) {
        res.status(404);
        throw new ApiError('Product not found', 404);
    }
    // Generate unique filename for the image cover
    const imageCoverFilename = req.file
        ? `product-${uuidv4()}-${Date.now()}.jpeg`
        : product.imageCover || 'default-product.jpeg';
    const imagesFilenames = req.files && req.files.length > 0
        ? req.files.map((file, index) => `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`)
        : product.images || ['default-product.jpeg'];

    if (req.file) {
        // Image processing for cover image
        await sharp(req.file.buffer)
            .resize(800, 800)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/products/${imageCoverFilename}`);
    }
    if (req.files && req.files.length > 0) {
        // Image processing for additional images
        await Promise.all(req.files.map((file, index) =>
            sharp(file.buffer)
                .resize(800, 800)
                .toFormat('jpeg')
                .jpeg({ quality: 95 })
                .toFile(`uploads/products/${imagesFilenames[index]}`)
        ));
    }
    const updatedProduct = await productModel.findByIdAndUpdate(id,{
        title,
        slug: slugify(title),
        description,
        price,
        category,
        subcategories,
        brand,
        imageCover: imageCoverFilename,
        images: imagesFilenames,
        quantity
    }, { new: true });
    res.status(200).json({
        status: 'success',
        data: {
            product: updatedProduct
        }
    });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findById(id);
  if (!product) {
    res.status(404);
    throw new ApiError('Product not found', 404);
  }
  // Use model-level deletion to be compatible across Mongoose versions
  await productModel.findByIdAndDelete(id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});



module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};