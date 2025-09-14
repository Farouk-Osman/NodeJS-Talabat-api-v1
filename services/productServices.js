/* eslint-disable node/no-missing-require */
/* eslint-disable import/no-unresolved */
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const productModel = require('../models/productModel');
const ApiError = require('../utils/apiError');
const { mongo } = require('mongoose');
const apiFeatures = require('../utils/apiFeatures');
const handlersFactory = require('./handlersFactory');

const getProduct = handlersFactory.getOne(productModel, 'category subCategory brand');
const getProducts = handlersFactory.getAll(productModel);
const deleteProduct = handlersFactory.deleteOne(productModel);
const updateProduct = handlersFactory.updateOne(productModel);
const createProduct = handlersFactory.createOne(productModel);

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};