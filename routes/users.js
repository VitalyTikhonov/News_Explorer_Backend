/* ИМПОРТ */
const router = require('express').Router();
// const {  } = require('../middleware/celeb-validate-req');
// const validator = require('validator');
// const { errors } = require('../helpers/errorMessages');

const {
  getCurrentUser,
  // getSingleUser,
  // updateProfile,
  // updateAvatar,
} = require('../controllers/users');

// /* РУТЕРЫ */
router.get('/me', getCurrentUser); // добавить валидацию куки?

// router.get(
//   '/:id',
//   celebrate(
//     {
//       params: Joi.object().options({ abortEarly: false }).keys({
//         id: Joi.objectId().required(),
//       }),
//     },
//     { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
//     { mode: 'full' },
//   ),
//   getSingleUser,
// );

// router.patch(
//   '/me',
//   celebrate(
//     {
//       body: Joi.object().options({ abortEarly: false }).keys({
//         name: Joi.string().required().min(2).max(30),
//         about: Joi.string().required().min(2).max(30),
//       }),
//     },
//     { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
//     { mode: 'full' },
//   ),
//   updateProfile,
// );

// router.patch(
//   '/me/avatar',
//   celebrate(
//     {
//       body: Joi.object().options({ abortEarly: false }).keys({
//         avatar: Joi.string().required().custom((value) => {
//           if (!validator.isURL(value)) {
//             throw new Error(errors.invalidInput.avatar);
//           }
//           return value;
//         }),
//       }),
//     },
//     { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
//     { mode: 'full' },
//   ),
//   updateAvatar,
// );

/* ЭКСПОРТ */
module.exports = router;
