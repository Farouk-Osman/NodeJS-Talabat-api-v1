const express = require('express');

const {
  createBrandValidator,
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require('../utils/validators/brandValidator');


const {
    createBrand,
    getBrands,
    getBrandById,
    updateBrand,
    deleteBrand,
} = require('../services/brandService');


const router = express.Router();

router
    .route('/')
    .post(createBrandValidator, createBrand)
    .get(getBrands);
router
    .route('/:id')
    .get(getBrandValidator, getBrandById)
    .put(updateBrandValidator, updateBrand)
    .delete(deleteBrandValidator, deleteBrand);

module.exports = router;