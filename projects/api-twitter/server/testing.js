const express = require('express');
const { Model: Tweet } = require('./api/v1/tweets/model');
const { Model: User } = require('./api/v1/users/model');
const { signToken } = require('./api/v1/auth');

const router = express.Router({
  mergeParams: true,
});

router.post("/clean-database", async (req, res, next) => {
  try {
    await Tweet.deleteMany({})
    await User.deleteMany({})
    res.json({})
  } catch (e) {
    next(e)
  }
})

module.exports = router;