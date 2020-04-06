const express = require('express');
const {userValidationRules, validate} = require('../middleware/validator.js');
const Router = express.Router;
const router = new Router;
const User = require('../models/User');


router.post(
    '/registration',
    userValidationRules(),
    validate,
    async (req, res) => {
      try {
        const newUser = await new User({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          role: req.body.role,
          status: 'ready',
        });

        await newUser.save();

        res.status(201).json({message: 'new user created'});
      } catch (e) {
        res.status(500).json({message: `Error: ${e}`});
      }
    });


module.exports = router;


