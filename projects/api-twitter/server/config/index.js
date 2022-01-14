require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  pagination: {
    limit: 10,
    skip: 0,
    page: 1,
  },
  sort: {
    sortBy: {
      fields: ['createdAt', 'updatedAt'],
      default: 'createdAt',
    },
    direction: {
      default: 'desc',
      options: ['asc', 'desc'],
    },
  },
  token: {
    secret: process.env.TOKEN_SECRET,
    expires: process.env.TOKEN_EXPIRES,
  },
  cors: {
    origin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
  }
};

module.exports = config;
