const express = require('express');
const controller = require('./controller');
const { auth, owner } = require('../auth');
const { sanitizers } = require('./model');

const router = express.Router({
  mergeParams: true,
});

/*
 * /api/tweets      GET    - Get All
 * /api/tweets      POST   - Create a new Tweet
 * /api/tweets/:id  GET    - Get a tweet
 * /api/tweets/:id  PUT    - Update a tweet
 * /api/tweets/:id  DELETE - Delete a tweet
 *
 */

router
  .route('/')
  .get(controller.parentId, controller.all)
  .post(controller.parentId, auth, sanitizers, controller.create);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.parentId, controller.read)
  .put(controller.parentId, auth, owner, sanitizers, controller.update)
  .patch(controller.parentId, auth, owner, sanitizers, controller.update)
  .delete(controller.parentId, auth, owner, controller.delete);

module.exports = router;
