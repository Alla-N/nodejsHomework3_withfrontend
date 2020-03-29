const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const Router = express.Router;
const router = new Router;
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const {password, email} = req.body;


  User.findOne({email: email}, function(err, user) {
    if (err || user === null) {
      res.json({message: 'Data is incorrect'});
    } else {
      const isPasswordValid = user.validatePassword(password);
      if (isPasswordValid) {
        const {secret} = config.get('JWT');
        const token = jwt.sign({
          userId: user._id,
        }, secret, {expiresIn: '1h'});

        res.json({
          token,
          id: user._id,
          message: 'success',
        });
      } else {
        res.json({message: 'Data is incorrect'});
      }
    }
  });
});


module.exports = router;
