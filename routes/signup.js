const router = require('express').Router();
const { validateSignup } = require('../middleware/celeb-validate-req');
const { createUser } = require('../controllers/users');

router.post('/', validateSignup, createUser);
module.exports = router;
