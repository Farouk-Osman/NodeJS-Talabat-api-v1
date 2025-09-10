const express = require('express');
const productImageUpload = require('../utils/uploadImage');
const {
    createProductValidator,
    getProductValidator,
    updateProductValidator,
    deleteProductValidator
} = require('../utils/validators/productValidator');
const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require('../services/productServices');


const router = express.Router();
router
    .route('/')
    .post(productImageUpload, createProductValidator, createProduct);
router.route('/').get(getProducts);
router
    .route('/:id')
    .get(getProductValidator, getProduct)
    .put(productImageUpload, updateProductValidator, updateProduct)
    .delete(deleteProductValidator, deleteProduct);


module.exports = router;


