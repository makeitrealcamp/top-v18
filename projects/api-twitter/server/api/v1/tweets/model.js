const mongoose = require('mongoose');

const fields = {
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
  },
  location: {
    type: String,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
};

const tweet = new mongoose.Schema(fields, {
  timestamps: true,
});

const model = mongoose.model('tweet', tweet);

module.exports = model;
