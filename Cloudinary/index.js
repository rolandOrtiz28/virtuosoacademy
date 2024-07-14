const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const folder = file.mimetype.startsWith('image/') ? 'thumbnails' : 'videos';
    return {
      folder: folder,
      allowedFormats: ['jpg', 'jpeg', 'png', 'mp4', 'avi', 'mov'],
      public_id: file.originalname.split('.')[0],
    };
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
