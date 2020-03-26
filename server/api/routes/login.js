const express = require('express');
const Router = express.Router;
const router = new Router;
const User = require('../helpers/user_model');

router.post('/login', async (req, res) => {
  const password = req.body.password;
  const username = req.body.username;

  User.findOne({username: username}, function(err, user) {
    if (err) throw err;

    user.comparePassword(password, function(err, isMatch) {
      if (err) throw err;
      res.json({
        status: 1,
        id: user._id,
        message: 'success',
      });
    });
  });
});


module.exports = router;
