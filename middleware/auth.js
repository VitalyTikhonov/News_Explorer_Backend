const jwt = require('jsonwebtoken');
const { isObjectIdValid } = require('../helpers');
const User = require('../models/user');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const UnknownRequestorError = require('../errors/UnknownRequestorError');
const InvalidObjectIdError = require('../errors/InvalidObjectIdError');

const { JWT_SECRET, JWT_COOKIE_NAME } = require('../configs/config');

module.exports = async (req, res, next) => {
  const token = req.cookies[JWT_COOKIE_NAME];

  if (!token) {
    return next(new NotAuthorizedError());
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    return next(new NotAuthorizedError());
  }

  req.user = payload;

  try {
    const userId = req.user._id; // после записи payload в req.user

    /* Ревьюэр: интересная проверка. Есть подозрения, что она не особо нужна. Так как
    в req.user._id невалидный id не может записаться в принципе. Запись в req.user
    происходит только при успешной авторизации. Чтобы авторизация была успешной, необходима
    успешная аутентификация. А успешная аутентификация невозможна по невалидному id, так как
    пользователь с таким id физически не может существовать в базе. */
    if (!isObjectIdValid(userId)) {
      throw new InvalidObjectIdError('requestor');
    }
    const checkIdentity = await User.exists({ _id: userId });
    if (!checkIdentity) {
      throw new UnknownRequestorError();
    }
  } catch (err) {
    next(err);
  }

  return next();
};
