const { upload } = require('../Utils/s3');

const singleUpload = upload.single('image');
const multipleUpload = upload.array('images', 5);

module.exports = {
  uploadSingleImage: (req, res, next) => {
    
    singleUpload(req, res, (err) => {
      if (err) {
        console.log(err)
        return res.status(400).json({ message: 'Image upload failed', error: err.message });
      }
      next();
    });
  },

  uploadMultipleImages: (req, res, next) => {
    multipleUpload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: 'Images upload failed', error: err.message });
      }
      next();
    });
  }
};