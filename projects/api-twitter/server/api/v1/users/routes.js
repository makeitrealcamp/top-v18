const express = require('express');
const controller = require('./controller');
const tweetsRouter = require('../tweets/routes');

const router = express.Router();

/*
 * /api/users        GET    - Get All
 * /api/users/signin POST   - Signin
 * /api/users/signup POST   - Signup
 * /api/users/:id    GET    - Get a User
 * /api/users/:id    PUT    - Update a User
 * /api/users/:id    DELETE - Delete a User
 *
 */

router.route('/').get(controller.all);

router.route('/signin').post(controller.signin);
router.route('/signup').post(controller.signup);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.delete);

router.use('/:user/tweets', tweetsRouter);

module.exports = router;
