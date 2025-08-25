const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
    type: String,
    required : [true, 'Category name is required'],
    unique: [true, 'Category name must be unique'],
    min_length: [3, 'Category name must be at least 3 characters long'],
    max_length: [50, 'Category name must be at most 50 characters long'],
    },
    slug: {
    type: String,
    lowercase: true,
    unique: [true, 'Slug must be unique'],
    index: [true, 'Slug must be indexed'],
    },
    image: String
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
