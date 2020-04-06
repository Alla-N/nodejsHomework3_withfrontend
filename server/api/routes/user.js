const jwt = require('jsonwebtoken');
const config = require('config');
const {secret} = config.get('JWT');
const express = require('express');
const Router = express.Router;
const router = new Router;
const User = require('../models/User');

router.get('/user/:id', (req, res)=>{
  const pageId = req.params.id;
  const token = req.headers['authorization'];

  if (token) {
    const userId = jwt.verify(token, secret);

    if (pageId !== userId) {
      return res.status(403).json({message: 'Access rejected'});
    }

    User.findById(userId)
        .then((user) => {
          res.status(200).json(user.id);
        })
        .catch((err) => {
          return res.status(404).json({status: err.name});
        });
  } else {
    res.status(403).json({message: 'Access rejected!'});
  }
});
module.exports = router;

