const { errors } = require('../helpers/errorMessages');

class InvalidUrlError extends Error {
  constructor() {
    super();
    this.statusCode = 400;
    this.message = errors.invalidInput.link;
  }
}

module.exports = InvalidUrlError;
