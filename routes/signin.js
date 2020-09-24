/* ИМПОРТ */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { login } = require('../controllers/users');

/* РУТЕРЫ */
router.post(
  '/',
  celebrate(
    {
      body: Joi.object().options({ abortEarly: false }).keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    },
    { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
    { mode: 'full' },
  ),
  login,
);

/* ЭКСПОРТ */
module.exports = router;
