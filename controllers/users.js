const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET, JWT_EXPIRY_DAYS, JWT_COOKIE_NAME } = require('../configs/config');
const DocNotFoundError = require('../errors/DocNotFoundError');
const EmailInUseError = require('../errors/EmailInUseError');
const InvalidInputError = require('../errors/InvalidInputError');

function createUser(req, res, next) {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((respObj) => {
          /* переменная с деструктуризацией const {свойства} = respObj удалена
          для исключения ошибки линтинга */
          res.send({
            email: respObj.email,
            name: respObj.name,
            _id: respObj._id,
          });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            next(new InvalidInputError(err));
          } else if (err.code === 11000) {
            next(new EmailInUseError());
          }
        });
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  return User.findByCredentials(email, password) // return!
    .then((user) => {
      const token = jwt.sign( // делаем токен
        { _id: user._id },
        // { _id: '5f59fd0c710b20e7857e392' }, // невалидный айди для тестирования
        JWT_SECRET,
        { expiresIn: `${JWT_EXPIRY_DAYS}d` },
      );
      res
        .cookie(JWT_COOKIE_NAME, token, { // отправляем токен
          maxAge: 3600000 * 24 * JWT_EXPIRY_DAYS,
          httpOnly: true,
          sameSite: true,
        })
        .send({ name: user.name });
      // .end();
    })
    .catch(next);
}

function logout(req, res) {
  res
    .clearCookie(JWT_COOKIE_NAME)
    .send({ message: 'Досвидосы!' });
  // .end();
}

function getCurrentUser(req, res, next) {
  const userId = req.user._id;
  /* идентификатор отправителя запроса (ПОДЧЕРКИВАНИЕ ПЕРЕД id!)
  (проверяется isObjectIdValid в auth) */

  User.findById(userId)
    .orFail(new DocNotFoundError('user'))
    .then((respObj) => {
      res.send({
        email: respObj.email,
        name: respObj.name,
      });
    })
    .catch(next);
}

module.exports = {
  createUser,
  login,
  logout,
  getCurrentUser,
};
