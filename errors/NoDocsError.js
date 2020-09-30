const { errors } = require('../configs/errorMessages');

class NoDocsError extends Error {
  constructor(docType) {
    super();
    this.statusCode = 404;
    this.message = errors.noDocs[docType];
  }
}

module.exports = NoDocsError;
