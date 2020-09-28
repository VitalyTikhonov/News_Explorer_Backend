const { NODE_ENV } = require('../configs/config');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  let responseBody;

  if (statusCode !== 500 || NODE_ENV === 'production') {
    responseBody = { message };
  } else {
    responseBody = err;
  }

  res.status(statusCode).send(responseBody);
  next();
};

module.exports = errorHandler;
