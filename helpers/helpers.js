const mongoose = require('mongoose');
const validator = require('validator');

const { errors } = require('./errorMessages');
const InvalidObjectIdError = require('../errors/InvalidObjectIdError');
const InvalidUrlError = require('../errors/InvalidUrlError');

function joinErrorMessages(errorObject) {
  const fieldErrorMap = errors.unknownInputError;
  const expectedBadFields = Object.keys(fieldErrorMap);
  const actualBadFields = Object.keys(errorObject.errors);
  const messageArray = [];
  let jointErrorMessage = null;
  if (expectedBadFields.some((field) => actualBadFields.includes(field))) {
    expectedBadFields.forEach((field) => {
      if (actualBadFields.includes(field)) {
        messageArray.push(fieldErrorMap[field]);
      }
    });
    jointErrorMessage = messageArray.join('. ');
  }
  return jointErrorMessage;
}

function isObjectIdValid(id, docType) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new InvalidObjectIdError(docType);
  }
}

function urlValidatorCheck(urlInput) {
  if (!validator.isURL(urlInput)) {
    throw new InvalidUrlError();
  }
  return urlInput;
}

module.exports = {
  joinErrorMessages,
  isObjectIdValid,
  urlValidatorCheck,
};
