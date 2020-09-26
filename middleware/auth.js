const jwt = require('jsonwebtoken');
const { isObjectIdValid } = require('../helpers/helpers');
const User = require('../models/user');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const UnknownRequestorError = require('../errors/UnknownRequestorError');

const { JWT_SECRET } = require('../configs/config');

module.exports = async (req, res, next) => {
  const token = req.cookies.jwt;

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
    isObjectIdValid(userId, 'requestor');
    const checkIdentity = await User.exists({ _id: userId });
    if (!checkIdentity) {
      throw new UnknownRequestorError();
    }
  } catch (err) {
    next(err);
  }

  return next();
};
