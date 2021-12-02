const express = require('express');
const controller = require('./controller');

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
  .post(controller.parentId, controller.create);

router.param('id', controller.parentId, controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.delete);

module.exports = router;
