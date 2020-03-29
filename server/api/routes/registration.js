const express = require('express');
const {userValidationRules, validate} = require('../middleware/validator.js');
const Router = express.Router;
const router = new Router;
const User = require('../models/User');

// eslint-disable-next-line max-len
router.post('/registration', userValidationRules(), validate, async (req, res) => {
  console.log('POST: ', req.url);

  const newUser = await new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role,
  });

  newUser.save()

      .then((response)=>{
        res.status(200).json({message: 'new user created'});
      })
      .catch((e)=>{
        res.status(500).json({message: `Error: ${e}`});
      });
});


module.exports = router;


