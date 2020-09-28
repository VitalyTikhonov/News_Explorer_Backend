const { isCelebrateError } = require('celebrate');

const { errors } = require('../helpers/errorMessages');

module.exports = (err, req, res, next) => {
  if (!isCelebrateError(err)) {
    return next(err);
  }

  const arrayFromCelebErrObjMap = Object.fromEntries(err.details);
  const arrayFromCelebErrObj = Object.entries(arrayFromCelebErrObjMap);
  const celebFieldsArr = [];
  const celebMessagesArr = [];
  let celebFieldsArrLength = 0;

  arrayFromCelebErrObj.map((reqSeg) => {
    const arrayFromSegmentObj = Object.entries(reqSeg[1]);
    const arrayfromErrObj = arrayFromSegmentObj[1][1];

    const celebFields = arrayfromErrObj.map((errObj) => {
      celebFieldsArrLength += 1;
      return errObj.context.label;
    }).join(', ');
    celebFieldsArr.push(celebFields);

    const celebMessages = arrayfromErrObj.map((errObj) => errObj.message).join(', ');
    return celebMessagesArr.push(celebMessages);
  });
  const allCelebFields = celebFieldsArr.join(', ');
  const allCelebMessages = celebMessagesArr.join(', ');
  const returnedErr = new Error();
  returnedErr.statusCode = 400;
  returnedErr.message = ''.concat(
    celebFieldsArrLength > 1 ? errors.missing.introPl : errors.missing.introSg,
    allCelebFields,
    ': ',
    allCelebMessages,
    '.',
  );
  return next(returnedErr);
};
