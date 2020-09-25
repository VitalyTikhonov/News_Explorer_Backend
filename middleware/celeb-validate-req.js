const { celebrate, Joi } = require('celebrate');
// Joi.objectId = require('joi-objectid')(Joi);

const urlValidatorCheck = require('../helpers/helpers');

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

const validateNewArticleInput = celebrate(
  {
    body: Joi.object().options({ abortEarly: false }).keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().custom(urlValidatorCheck),
      image: Joi.string().required().custom(urlValidatorCheck),
    }),
  },
  { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
  { mode: 'full' },
);

module.exports = {
  validateSignup,
  validateSignin,
  validateNewArticleInput,
};
