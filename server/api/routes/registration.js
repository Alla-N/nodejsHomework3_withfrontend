const express = require('express');
const Router = express.Router;
const router = new Router;
const User = require('../helpers/user_model');


router.post('/registration', async (req, res) => {
  console.log('POST: ', req.url);
  const newUser = await new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role,
  });

  newUser.save()
      .then(()=>{
        res.status(200).json({status: 'new user created'});
      })
      .catch((e)=>{
        console.log('Save user return error: ', e);
        res.json({'status': e});
      });
});


module.exports = router;


