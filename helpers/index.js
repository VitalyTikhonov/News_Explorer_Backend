const mongoose = require('mongoose');
const validator = require('validator');

const { errors } = require('../configs/errorMessages');

function joinErrorMessages(errorObject) {
  const fieldErrorMap = errors.invalidInput;
  const expectedBadFields = Object.keys(fieldErrorMap);
  const actualBadFields = Object.keys(errorObject.errors);
  const badFieldNumber = actualBadFields.length;
  const messageArray = [];
  let jointErrorMessage = null;
  if (expectedBadFields.some((field) => actualBadFields.includes(field))) {
    expectedBadFields.forEach((field) => {
      if (actualBadFields.includes(field)) {
        messageArray.push(fieldErrorMap[field]);
      }
    });
    jointErrorMessage = `${badFieldNumber > 1 ? fieldErrorMap.introPl : fieldErrorMap.introSg}${messageArray.join(', ')}`;
  }
  return jointErrorMessage;
}

function isObjectIdValid(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function urlValidatorCheck(urlInput) {
  return validator.isURL(urlInput);
}

module.exports = {
  joinErrorMessages,
  isObjectIdValid,
  urlValidatorCheck,
};
