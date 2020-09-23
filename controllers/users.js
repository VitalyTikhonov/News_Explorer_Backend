const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const DocNotFoundError = require('../errors/DocNotFoundError');
// const NoDocsError = require('../errors/NoDocsError');
const BadNewPasswordError = require('../errors/BadNewPasswordError');
const EmailInUseError = require('../errors/EmailInUseError');
const InvalidInputError = require('../errors/InvalidInputError');
// const UnknownRequestorError = require('../errors/UnknownRequestorError');
const MissingCredentialsError = require('../errors/MissingCredentialsError');

const { NODE_ENV, JWT_SECRET } = process.env;
const { passwordRegexp } = require('../helpers/helpers');

function createUser(req, res, next) {
  const {
    email,
    password,
    name,
  } = req.body;

  const PSWLENGTH = 8;

  if (password && password.length >= PSWLENGTH && password.match(passwordRegexp)) {
    /* По аналогии с тем, как в тренажере предложено сделать для авторизации
    (User.findByCredentials), пытался сделать и здесь, чтобы проверять, не занята ли почта,
    прежде чем считать хеш пароля. Но не получилось разобраться с множеством ошибок, которые
    возникали. */
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
  } else {
    next(new BadNewPasswordError(PSWLENGTH));
  }
}

function login(req, res, next) {
  const { email, password } = req.body;
  if (typeof email === 'string'
    && typeof password === 'string'
    /* Чем обусловены следующие две проверки: насколько я сейчас понимаю, поле password все равно
    присутсвует в запросе, даже если пароль не введен, – просто оно пустое, но это строка.
    Если так, то ошибку выбросит модель, а там у нее будет негативный текст – "Неправильные…",
    что неправильно. Если одно из полей пустое, нужно сообщать "Введите" или типа такого. */
    && email.length !== 0
    && password.length !== 0) {
    return User.findByCredentials(email, password) // return!
      .then((user) => {
        const token = jwt.sign( // делаем токен
          { _id: user._id },
          // { _id: '5f59fd0c710b20e7857e392' }, // невалидный айди для тестирования
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        );
        res
          .cookie('jwt', token, { // отправляем токен
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          })
          .end();

        /* Как токен попадает в req.cookies.jwt при запросе логина, то есть еще до авторизации?.. */
        // console.log('req.cookies.jwt', req.cookies.jwt);
      })
      .catch(next);
  }
  return next(new MissingCredentialsError());
}

function getSingleUser(req, res, next) {
  try {
    const userId = req.params.id; // интересующего пользователя (joi-objectid)
    User.findById(userId)
      .orFail(new DocNotFoundError('user'))
      .then((respObj) => res.send(respObj))
      .catch(next);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  login,
  getSingleUser,
};
