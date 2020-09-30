const { errors } = require('../configs/errorMessages');

class NotAuthorizedError extends Error {
  constructor() {
    super();
    this.statusCode = 401;
    this.message = errors.notAuthorized;
  }
}

module.exports = NotAuthorizedError;
