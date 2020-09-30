const router = require('express').Router();

const signup = require('./signup');
const signin = require('./signin');
const auth = require('../middleware/auth');
const users = require('./users');
const articles = require('./articles');
const { BASE_PATH } = require('../configs/config');
const NotFoundError = require('../errors/NotFoundError');
const { validateAuthCookie } = require('../middleware/celeb-validate-req');

router.use(`${BASE_PATH}signup`, signup);
router.use(`${BASE_PATH}signin`, signin);
router.use(validateAuthCookie, auth);
router.use(`${BASE_PATH}users`, users);
router.use(`${BASE_PATH}articles`, articles);
router.use((req, res, next) => next(new NotFoundError()));

module.exports = router;
