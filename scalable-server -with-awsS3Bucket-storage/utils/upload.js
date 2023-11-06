// upload.js
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const { s3, bucketName } = require('../config/aws.config'); 

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() === '.pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDFs are allowed'));
    }
  },
  // limits: { fileSize: 10 * 1024 * 1024 }, // Optional file size limit
});

module.exports = upload;
