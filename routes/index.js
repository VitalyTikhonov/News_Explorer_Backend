const router = require('express').Router();

const signup = require('./signup');
const signin = require('./signin');
const auth = require('../middleware/auth');
const users = require('./users');
const articles = require('./articles');
const { BASE_PATH } = require('../configs/config');
const NotFoundError = require('../errors/NotFoundError');

router.use(`${BASE_PATH}signup`, signup);
router.use(`${BASE_PATH}signin`, signin);
router.use(auth);
router.use(`${BASE_PATH}users`, users);
router.use(`${BASE_PATH}articles`, articles);
router.get(`${BASE_PATH}crash-test`, () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.use((req, res, next) => next(new NotFoundError()));

module.exports = router;
