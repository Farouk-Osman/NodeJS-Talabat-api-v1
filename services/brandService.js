/* eslint-disable new-cap */
/* eslint-disable node/no-missing-require */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

const brandModel = require('../models/brand');
const handlersFactory = require('./handlersFactory');

const deleteBrand = handlersFactory.deleteOne(brandModel);
const updateBrand = handlersFactory.updateOne(brandModel);
const createBrand = handlersFactory.createOne(brandModel);
const getBrands = handlersFactory.getAll(brandModel);

const getBrandById = handlersFactory.getOne(brandModel);

module.exports = {
  createBrand,
  getBrands,
  updateBrand,
  getBrandById,
  deleteBrand,
};