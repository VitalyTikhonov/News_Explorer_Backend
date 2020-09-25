const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const { errors } = require('../helpers/errorMessages');
const InvalidCredentialsError = require('../errors/InvalidCredentialsError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, errors.missing.email],
    unique: [true, errors.notUnique.email],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: errors.invalidInput.email,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findByCredentials = function findByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new InvalidCredentialsError())
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new InvalidCredentialsError());
        }
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
