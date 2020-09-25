const router = require('express').Router();
const { validateSignin } = require('../middleware/celeb-validate-req');
const { login } = require('../controllers/users');

router.post('/', validateSignin, login);
module.exports = router;
