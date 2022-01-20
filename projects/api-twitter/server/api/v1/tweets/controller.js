const {
  filterByNested,
  paginationParams,
  sortParams,
  sortTransform,
} = require('../../../utils');

// eslint-disable-next-line object-curly-newline
const { Model, fields, references, virtuals } = require('./model');
const { Model: User } = require('../users/model');
const uploadToS3 = require('../../../utils/uploadToS3');

const referencesNames = [
  ...Object.getOwnPropertyNames(references),
  ...Object.getOwnPropertyNames(virtuals),
];

exports.parentId = async (req, res, next) => {
  const { params = {} } = req;
  const { user = '' } = params;

  if (user) {
    const data = await User.findById(user).exec();
    if (data) {
      next();
    } else {
      const message = 'User not found';
      next({
        message,
        statusCode: 404,
        level: 'warn',
      });
    }
  } else {
    next();
  }
};

exports.id = async (req, res, next) => {
  const { params = {} } = req;
  const { id = '' } = params;
  const { populate } = filterByNested(params, referencesNames);

  try {
    const data = await Model.findById(id).populate(populate);
    if (!data) {
      const message = `${Model.modelName} not found`;
      next({
        message,
        statusCode: 404,
        level: 'warn',
      });
    } else {
      req.doc = data;
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.all = async (req, res, next) => {
  const { params, query } = req;
  const { limit, skip, page } = paginationParams(query);
  const { sortBy, direction } = sortParams(query, fields);
  const updatedReferencesNames = referencesNames.filter(
    (item) => item !== 'comments',
  );
  const { filters, populate } = filterByNested(params, updatedReferencesNames);

  const docs = Model.find(filters)
    .sort(sortTransform(sortBy, direction))
    .skip(skip)
    .limit(limit)
    .populate(populate);
  const all = Model.countDocuments(filters);

  try {
    const response = await Promise.all([docs.exec(), all.exec()]);
    const [data, total] = response;
    const pages = Math.ceil(total / limit);

    res.json({
      data,
      meta: {
        limit,
        skip,
        total,
        page,
        pages,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  const { body = {}, decoded } = req;
  const { id } = decoded;

  let photo = ""
  if (req.files?.file) {
    photo = await uploadToS3({
      s3path: `tweets/${id}/images/photos`,
      file: req.files.file,
      allowedExts: ["jpg","jpeg", "png"],
      maxSize: 2000000
    })
  }

  const document = new Model({
    ...body,
    user: id,
    photo
  });

  try {
    const data = await document.save();
    const status = 201;
    res.status(status);
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.read = async (req, res, next) => {
  const { doc = {} } = req;

  res.json({
    data: doc,
  });
};

exports.update = async (req, res, next) => {
  // const { doc = {}, body = {}, params = {} } = req;
  const { doc = {}, body = {} } = req;

  // Object.assign(doc, body, params);
  Object.assign(doc, body);

  try {
    // Model.findByIdAndUpdate()
    const data = await doc.save();
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  const { doc = {} } = req;
  try {
    // Model.findByIdAndDelete()
    const data = await doc.remove();
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
