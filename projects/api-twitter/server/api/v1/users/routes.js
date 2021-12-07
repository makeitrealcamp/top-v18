const express = require('express');
const controller = require('./controller');
const tweetsRouter = require('../tweets/routes');
const { auth } = require('../auth');
const { sanitizers } = require('./model');

const router = express.Router();

/*
 * /api/users            GET    - Get All
 * /api/users/signin     POST   - Signin
 * /api/users/signup     POST   - Signup
 * /api/users/profile    GET    - Get the profile of the current user
 * /api/users/profile    PUT    - Update the profile of the current user
 * /api/users/:id        GET    - Get a User
 * /api/users/:id/tweets GET    - Get tweets from the user
 *
 */

router.route('/').get(controller.all);

router.route('/signin').post(controller.signin);
router.route('/signup').post(sanitizers, controller.signup);

router
  .route('/profile')
  .get(auth, controller.profile)
  .put(auth, controller.update)
  .patch(auth, controller.update);

router.param('id', controller.id);
router.route('/:id').get(auth, controller.read);

router.use('/:user/tweets', tweetsRouter);

module.exports = router;
