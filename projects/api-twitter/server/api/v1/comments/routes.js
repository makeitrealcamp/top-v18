const express = require('express');
const controller = require('./controller');

const router = express.Router();

/*
 * /api/comments      GET    - Get All
 * /api/comments      POST   - Create a new Tweet
 * /api/comments/:id  GET    - Get a tweet
 * /api/comments/:id  PUT    - Update a tweet
 * /api/comments/:id  DELETE - Delete a tweet
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

module.exports = router;
