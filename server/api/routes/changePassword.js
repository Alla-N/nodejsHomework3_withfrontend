const jwt = require('jsonwebtoken');
const config = require('config');
const {secret} = config.get('JWT');
const express = require('express');
const Router = express.Router;
const router = new Router;
const User = require('../models/User');

router.patch(
    '/change_password',
    async (req, res) => {
      const {newPassword, id, currentPassword} = req.body;
      const token = req.headers['authorization'];

      if (token) {
        const {userId} = await jwt.verify(token, secret);

        if (id !== userId) {
          return res.status(403).json({message: 'Access rejected'});
        }
        await User.findById(
            userId,
            function(err, user) {
              if (err || user === null) {
                res.status(404).json({message: 'Data is incorrect'});
              } else {
                const isPasswordValid = user.validatePassword(currentPassword);
                if (isPasswordValid) {
                  user.password = newPassword;
                  user.save();
                  res.status(200).json({
                    message: 'Done! Login again with new password.'});
                } else {
                  res.status(403).json({message: 'Data is incorrect'});
                }
              }
            });
      }
    });


module.exports = router;
