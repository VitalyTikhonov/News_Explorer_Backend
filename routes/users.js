/* ИМПОРТ */
const router = require('express').Router();

const { getCurrentUser } = require('../controllers/users');

/* РУТЕРЫ */
router.get('/me', getCurrentUser); // добавить валидацию куки (вместо isObjectIdValid в auth)?

/* ЭКСПОРТ */
module.exports = router;
