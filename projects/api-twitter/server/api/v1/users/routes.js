const express = require('express');
const controller = require('./controller');
const tweetsRouter = require('../tweets/routes');

const router = express.Router();

/*
 * /api/users      GET    - Get All
 * /api/users      POST   - Create a new User
 * /api/users/:id  GET    - Get a User
 * /api/users/:id  PUT    - Update a User
 * /api/users/:id  DELETE - Delete a User
 *
 */

router.route('/').get(controller.all).post(controller.create);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.delete);

router.use('/:user/tweets', tweetsRouter);

module.exports = router;
