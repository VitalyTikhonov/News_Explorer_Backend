const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const { isObjectIdValid, urlValidatorCheck } = require('../helpers');
const { errors } = require('../configs/errorMessages');

const validateSignup = celebrate(
  {
    /* abortEarly – чтобы валидировались все поля одного типа (например, все в body) */
    body: Joi.object().options({ abortEarly: false }).keys({
      email: Joi.string().email().required()
        .messages({
          'string.base': errors.notString,
          'any.required': errors.missing.email,
          'string.empty': errors.missing.email,
          'string.email': errors.badEmail,
        }),
      password: Joi.string().required()
        .messages({
          'string.base': errors.notString,
          'any.required': errors.missing.password,
          'string.empty': errors.missing.password,
        }),
      name: Joi.string().required().min(2).max(30)
        .messages({
          'string.base': errors.notString,
          'any.required': errors.missing.name,
          'string.empty': errors.missing.name,
          'string.min': errors.tooShort(2),
          'string.max': errors.tooLong(30),
        }),
    }),
  },
  { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
  { mode: 'full' }, // чтобы валидировались все типы полей (и body, и params и т. п.)
);

const validateSignin = celebrate(
  {
    body: Joi.object().options({ abortEarly: false }).keys({
      email: Joi.string().email().required()
        .messages({
          'string.base': errors.notString,
          'any.required': errors.missing.email,
          'string.empty': errors.missing.email,
          'string.email': errors.badEmail,
        }),
      password: Joi.string().required()
        .messages({
          'string.base': errors.notString,
          'any.required': errors.missing.password,
          'string.empty': errors.missing.password,
        }),
    }),
  },
  { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
  { mode: 'full' }, // чтобы валидировались все типы полей (и body, и params и т. п.)
);

const validatePostArticle = celebrate(
  {
    body: Joi.object().options({ abortEarly: false }).keys({
      keyword: Joi.string().required()
        .messages({
          'string.base': errors.notString,
          'any.required': errors.missing.keyword,
          'string.empty': errors.missing.keyword,
        }),
      title: Joi.string().required()
        .messages({
          'string.base': errors.notString,
          'any.required': errors.missing.title,
          'string.empty': errors.missing.title,
        }),
      text: Joi.string().required()
        .messages({
          'string.base': errors.notString,
          'any.required': errors.missing.text,
          'string.empty': errors.missing.text,
        }),
      date: Joi.string().required()
        .messages({
          'string.base': errors.notString,
          'any.required': errors.missing.date,
          'string.empty': errors.missing.date,
        }),
      source: Joi.string().required()
        .messages({
          'string.base': errors.notString,
          'any.required': errors.missing.source,
          'string.empty': errors.missing.source,
        }),
      link: Joi.string().required()
        .messages({
          'string.base': errors.notString,
          'any.required': errors.missing.link,
          'string.empty': errors.missing.link,
        })
        .custom((value, helpers) => {
          if (urlValidatorCheck(value)) {
            return value;
          }
          return helpers.message(errors.badUrl.link);
        }),
      urlToImage: Joi.string().required()
        .messages({
          'string.base': errors.notString,
          'any.required': errors.missing.urlToImage,
          'string.empty': errors.missing.urlToImage,
        })
        .custom((value, helpers) => {
          if (urlValidatorCheck(value)) {
            return value;
          }
          return helpers.message(errors.badUrl.urlToImage);
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
