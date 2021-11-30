const express = require('express');
const bodyParser = require('body-parser');

const api = require('./api/v1');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/api', api);
app.use('/api/1', api);

// catch all
app.use((req, res, next) => {
  const message = 'Error. Route Not Found';
  const statusCode = 404;

  next({
    statusCode,
    message,
  });
});

// error
app.use((err, req, res, next) => {
  const { statusCode = 500, message = '' } = err;

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
