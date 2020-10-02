const { isCelebrateError } = require('celebrate');

const { errors } = require('../configs/errorMessages');

module.exports = (err, req, res, next) => {
  if (!isCelebrateError(err)) {
    return next(err);
  }

  const arrayFromCelebErrObjMap = Object.fromEntries(err.details);
  const arrayFromCelebErrObj = Object.entries(arrayFromCelebErrObjMap);
  const errObjArr = [];
  let errObjArrLength = 0;

  arrayFromCelebErrObj.forEach((reqSeg) => {
    const arrayFromSegmentObj = Object.entries(reqSeg[1]);
    const arrayFromErrObj = arrayFromSegmentObj[1][1];
    arrayFromErrObj.forEach((errObj) => {
      errObjArrLength += 1;
      errObjArr.push(errObj);
    });
  });

  const labelMessArray = errObjArr.map((errObj) => `${errObj.context.label} – ${errObj.message}`);

  const finalMessage = labelMessArray.join('; ');
  const returnedErr = new Error();
  returnedErr.statusCode = 400;
  returnedErr.message = `${errObjArrLength > 1 ? errors.celebIntroPl : errors.celebIntroSg}: ${finalMessage}`;
  return next(returnedErr);
};
