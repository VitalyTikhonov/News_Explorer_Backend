const { errors } = require('../configs/errorMessages');

class BadNewPasswordError extends Error {
  constructor(pswlength) {
    super();
    this.statusCode = 400;
    this.message = errors.badPassword(pswlength);
  }
}

module.exports = BadNewPasswordError;
