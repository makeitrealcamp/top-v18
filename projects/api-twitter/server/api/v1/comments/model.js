const mongoose = require('mongoose');

const fields = {
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: 256,
  },
};

const references = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  tweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tweet',
    required: true,
  },
};

const comment = new mongoose.Schema(fields, {
  timestamps: true,
});

const model = mongoose.model('comment', comment);

module.exports = {
  Model: model,
  fields,
  references,
};
