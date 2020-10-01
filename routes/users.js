/* ИМПОРТ */
const router = require('express').Router();

const { getCurrentUser } = require('../controllers/users');

/* РУТЕРЫ */
router.get('/me', getCurrentUser);

/* ЭКСПОРТ */
module.exports = router;
