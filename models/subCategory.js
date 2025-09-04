const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'SubCategory name is required'],
      unique: [true, 'SubCategory name must be unique'],
      min_length: [3, 'SubCategory name must be at least 3 characters long'],
      max_length: [50, 'SubCategory name must be at most 50 characters long'],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: [true, 'Slug must be unique'],
      index: [true, 'Slug must be indexed'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'SubCategory must belong to a Category'],
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
