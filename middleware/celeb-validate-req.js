const { celebrate, Joi } = require('celebrate');
// Joi.objectId = require('joi-objectid')(Joi);
// const validator = require('validator');
// const { errors } = require('../helpers/errorMessages');

const validateSignup = celebrate(
  {
    body: Joi.object().options({ abortEarly: false }).keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required().min(2).max(30),
    }),
  },
  { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
  { mode: 'full' },
);

const validateSignin = celebrate(
  {
    body: Joi.object().options({ abortEarly: false }).keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
  { mode: 'full' },
);

module.exports = {
  validateSignup,
  validateSignin,
};
