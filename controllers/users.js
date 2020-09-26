const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET, JWT_EXPIRY_DAYS } = require('../configs/config');
const DocNotFoundError = require('../errors/DocNotFoundError');
// const BadNewPasswordError = require('../errors/BadNewPasswordError');
const EmailInUseError = require('../errors/EmailInUseError');
const InvalidInputError = require('../errors/InvalidInputError');
const MissingCredentialsError = require('../errors/MissingCredentialsError');

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
  if (typeof email === 'string'
    && typeof password === 'string'
    /* Чем обусловены следующие две проверки: насколько я сейчас понимаю, поле password все равно
    присутсвует в запросе, даже если пароль не введен, – просто оно пустое, но это строка.
    Если так, то ошибку выбросит модель, а там у нее будет негативный текст – "Неправильные…",
    что неправильно. Если одно из полей пустое, нужно сообщать "Введите" или типа такого.

    – Убрать, когда разберусь с кастомизацией сообщений об ошибках. */
    && email.length !== 0
    && password.length !== 0) {
    return User.findByCredentials(email, password) // return!
      .then((user) => {
        const token = jwt.sign( // делаем токен
          { _id: user._id },
          // { _id: '5f59fd0c710b20e7857e392' }, // невалидный айди для тестирования
          JWT_SECRET,
          { expiresIn: `${JWT_EXPIRY_DAYS}d` },
        );
        res
          .cookie('jwt', token, { // отправляем токен
            maxAge: 3600000 * 24 * JWT_EXPIRY_DAYS,
            httpOnly: true,
            sameSite: true,
          })
          .end();
      })
      .catch(next);
  }
  return next(new MissingCredentialsError());
}

function getCurrentUser(req, res, next) {
  try {
    const userId = req.user._id;
    /* идентификатор отправителя запроса (ПОДЧЕРКИВАНИЕ ПЕРЕД id!)
    (проверяется isObjectIdValid в auth) */

    User.findById(userId)
      .orFail(new DocNotFoundError('user'))
      // .then((respObj) => res.send(respObj))
      .then((respObj) => {
        res.send({
          email: respObj.email,
          name: respObj.name,
        });
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  login,
  getCurrentUser,
};
