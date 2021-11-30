const express = require('express');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

const api = require('./api/v1');
const logger = require('./config/logger');

const app = express();

// middleware
app.use((req, res, next) => {
  res.setHeader('X-Request-Id', uuidv4());
  next();
});
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message),
    },
  }),
);
app.use(express.json()); // parse application/json

// API
app.use('/api', api);
app.use('/api/1', api);

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
app.use((err, req, res, next) => {
  const { statusCode = 500, message = '' } = err;

  logger.error(message);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
