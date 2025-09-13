// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const ApiError = require('./apiError');
 
const multerOptions = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new ApiError('Only Images allowed', 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload;
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);
// Helper to upload multiple images (array) for a given field name
exports.uploadMultipleImages = (fieldName, maxCount = 5) => multerOptions().array(fieldName, maxCount);

// Convenience middleware specifically for product uploads: one cover and multiple images
exports.uploadProductImages = () => {
  const upload = multerOptions();
  return upload.fields([
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]);
};
