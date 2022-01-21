const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const { logger, requestId, requestLog } = require('./config/logger');
const { cors: corsConfig } = require('./config');

const api = require('./api/v1');
const testing = require('./testing');
const swaggerDocument = require('./api/v1/swagger.json');
const fileUpload = require('express-fileupload');

const app = express();

// middleware
app.use(
  cors({
    origin: corsConfig.origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  }),
);
app.use(requestId);
app.use(requestLog);
app.use(express.json()); // parse application/json
app.use(fileUpload())

// API
app.use('/api', api);
app.use('/api/1', api);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV === "test") {
  app.use('/testing', testing)
}

// catch all
app.use((req, res, next) => {
  const message = 'Error. Route Not Found';
  const statusCode = 404;

  logger.warn(message);

  next({
    statusCode,
    message,
  });
});

// error
app.use((error, req, res, next) => {
  const { message = '', name = '' } = error;
  let { statusCode = 500 } = error;

  if (name === 'ValidationError') {
    statusCode = 422;
    logger.warn(message);
  } else {
    logger.error(message);
  }

  res.status(statusCode);
  res.json({
    message,
    error,
  });
});

module.exports = app;
