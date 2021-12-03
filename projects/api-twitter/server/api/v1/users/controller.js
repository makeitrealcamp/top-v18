const {
  paginationParams,
  sortParams,
  sortTransform,
} = require('../../../utils');
const { Model, fields } = require('./model');

exports.id = async (req, res, next) => {
  const { params = {} } = req;
  const { id = '' } = params;

  try {
    const data = await Model.findById(id);
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
  const { query } = req;
  const { limit, skip, page } = paginationParams(query);
  const { sortBy, direction } = sortParams(query, fields);

  const docs = Model.find({})
    .sort(sortTransform(sortBy, direction))
    .skip(skip)
    .limit(limit);
  const all = Model.countDocuments();

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

exports.signin = async (req, res, next) => {
  // Recibir informacion
  const { body = {} } = req;
  const { username, password } = body;

  try {
    // Buscar el usuario (documento) por el username
    const user = await Model.findOne({
      username,
    }).exec();
    // SI NO = res no existe 401
    const message = 'Username or password invalid';
    const statusCode = 401;

    if (!user) {
      return next({
        message,
        statusCode,
      });
    }

    // SI = Veriticar Password
    const verified = await user.verifyPassword(password);
    if (!verified) {
      // SI NO = res no existe 401
      return next({
        message,
        statusCode,
      });
    }

    // SI = Devolver la informacion del usuario
    return res.json({
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

exports.signup = async (req, res, next) => {
  const { body = {} } = req;
  const document = new Model(body);

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
  const { doc = {}, body = {} } = req;

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
