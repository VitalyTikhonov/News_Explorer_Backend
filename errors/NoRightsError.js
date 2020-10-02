const { errors } = require('../configs/errorMessages');

class NoRightsError extends Error {
  constructor() {
    super();
    this.statusCode = 403;
    this.message = errors.noDeleteArticleRights;
  }
}

module.exports = NoRightsError;
