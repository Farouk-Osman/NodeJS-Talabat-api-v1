const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Brand name is required'],
            minlength: [3, 'Brand name must be at least 2 characters long'],
            maxlength: [50, 'Brand name must be at most 100 characters long'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const brandModel = mongoose.model('Brand', brandSchema);

module.exports = brandModel;
