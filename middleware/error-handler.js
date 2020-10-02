const { NODE_ENV } = require('../configs/config');
const { errors } = require('../configs/errorMessages');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message = errors.serverError } = err;

  let responseBody;

  if (statusCode !== 500 || NODE_ENV === 'production') {
    responseBody = { message };
  } else {
    responseBody = { message: err.message };
  }

  res.status(statusCode).send(responseBody);
  next();
};

module.exports = errorHandler;
