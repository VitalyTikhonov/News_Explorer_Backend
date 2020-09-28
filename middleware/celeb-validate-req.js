const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
// const validator = require('validator');

const { isObjectIdValid, urlValidatorCheck } = require('../helpers/helpers');
const { errors } = require('../helpers/errorMessages');

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

const validatePostArticle = celebrate(
  {
    /* abortEarly – чтобы валидировались все поля одного типа (например, все в body) */
    body: Joi.object().options({ abortEarly: false }).keys({
      keyword: Joi.string().required()
        .messages({
          'any.required': errors.missing.keyword,
          'string.empty': errors.missing.keyword,
        }),
      title: Joi.string().required()
        .messages({
          'any.required': errors.missing.title,
          'string.empty': errors.missing.title,
        }),
      text: Joi.string().required()
        .messages({
          'any.required': errors.missing.text,
          'string.empty': errors.missing.text,
        }),
      date: Joi.string().required()
        .messages({
          'any.required': errors.missing.date,
          'string.empty': errors.missing.date,
        }),
      source: Joi.string().required()
        .messages({
          'any.required': errors.missing.source,
          'string.empty': errors.missing.source,
        }),
      link: Joi.string().required()
        .messages({
          'any.required': errors.missing.link,
          'string.empty': errors.missing.link,
        })
        .custom((value, helpers) => {
          if (urlValidatorCheck(value)) {
            return value;
          }
          return helpers.message(errors.badUrl);
        }),
      image: Joi.string().required()
        .messages({
          'any.required': errors.missing.image,
          'string.empty': errors.missing.image,
        })
        .custom((value, helpers) => {
          if (urlValidatorCheck(value)) {
            return value;
          }
          return helpers.message(errors.badUrl);
        }),
    }),
  },
  { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
  { mode: 'full' }, // чтобы валидировались все типы полей (и body, и params и т. п.)
);

const validateDeleteArticle = celebrate(
  {
    params: Joi.object().options({ abortEarly: false }).keys({
      articleId: Joi.required()
        .messages({
          'any.required': errors.missing.articleId,
        })
        .custom((id, helpers) => {
          if (isObjectIdValid(id)) {
            return id;
          }
          return helpers.message(errors.objectId.articleId);
        }),
    }),
  },
  { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
  { mode: 'full' }, // чтобы валидировались все типы полей (и body, и params и т. п.)
);

module.exports = {
  validateSignup,
  validateSignin,
  validatePostArticle,
  validateDeleteArticle,
};
