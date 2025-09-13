const express = require('express');
const { uploadProductImages } = require('../utils/uploadImage');
const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
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
  .post(uploadProductImages(), createProductValidator, createProduct);
router.route('/').get(getProducts);
router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(uploadProductImages(), updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);


module.exports = router;


