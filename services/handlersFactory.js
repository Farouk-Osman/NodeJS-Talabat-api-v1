/* eslint-disable new-cap */
const asyncHandler = require('express-async-handler');
const apiError = require('../utils/apiError');
const apiFeatures = require('../utils/apiFeatures');

const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      return next(new apiError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndUpdate(id, req.body, { new: true });
    if (!doc) {
      return next(new apiError('No document found with that ID', 404));
      }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

const getOne = (Model, popOptions) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);
    if (popOptions) {
      query = query.populate(popOptions);
    }
    const doc = await query;
    if (!doc) {
      return next(new apiError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });


const getAll = (Model) =>
  asyncHandler(async (req, res) => {
    const apiFeature = new apiFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .search();
    const { mongooseQuery, paginationResult } = apiFeature;
    const docs = await mongooseQuery;
    res.status(200).json({
      status: 'success',
      results: docs.length,
      pagination: paginationResult,
      data: {
        docs
      }
    });
  });

module.exports = {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll
};