const jwt = require('jsonwebtoken');
const { isObjectIdValid } = require('../helpers');
const User = require('../models/user');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const UnknownRequestorError = require('../errors/UnknownRequestorError');
const InvalidObjectIdError = require('../errors/InvalidObjectIdError');

const { JWT_SECRET } = require('../configs/config');

module.exports = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    console.log('NO TOKEN');
    return next(new NotAuthorizedError());
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    console.log('WRONG TOKEN');
    return next(new NotAuthorizedError());
  }

  req.user = payload;

  try {
    const userId = req.user._id; // после записи payload в req.user
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
