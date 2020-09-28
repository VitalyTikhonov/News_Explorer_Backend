const { NODE_ENV } = require('../configs/config');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  const errorMessage = {
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  };

  const responseBody = NODE_ENV === 'production' ? errorMessage : err;

  res.status(statusCode).send(responseBody);
  next();
};

module.exports = errorHandler;
