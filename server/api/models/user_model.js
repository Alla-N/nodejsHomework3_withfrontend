const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const config = require('config');
const {salt_factor} = config.get('bcrypt');

const UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  email: {
    type: String,
    index: true,
    unique: true,
    required: true,
    uniqueCaseInsensitive: true,
  },
  password: {type: String, required: true},
  role: String,
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {
  const User = this;

  // only hash the password if it has been modified (or is new)
  if (!User.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(salt_factor, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(User.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      User.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', UserSchema);
