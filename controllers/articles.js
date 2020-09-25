const mongoose = require('mongoose');
const Article = require('../models/article');
const { isObjectIdValid } = require('../helpers/helpers');

const NoDocsError = require('../errors/NoDocsError');
const DocNotFoundError = require('../errors/DocNotFoundError');
const InvalidInputError = require('../errors/InvalidInputError');
const NoRightsError = require('../errors/NoRightsError');

function getAllArticles(req, res, next) {
  Article.find({})
    .orFail(new NoDocsError('article'))
    .then((respObj) => res.send(respObj))
    .catch(next);
}

function createArticle(req, res, next) {
  try {
    const owner = req.user._id; // не менять owner на user! свой (проверяется в auth)
    const {
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    } = req.body;
    Article.create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner,
    })
      .then((respObj) => res.send(respObj))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          next(new InvalidInputError(err));
        }
      });
  } catch (err) {
    next(err);
  }
}

function deleteArticle(req, res, next) {
  try {
    const userId = req.user._id; // свой (проверяется в auth)
    const { articleId } = req.params; // проверяется joi-objectid
    isObjectIdValid(articleId, 'article');
    Article.findById(articleId)
      .orFail(new DocNotFoundError('article'))
      .then((respObj) => {
        if (respObj.owner.equals(userId)) {
          respObj.deleteOne()
            .then((deletedObj) => res.send(deletedObj));
        } else {
          next(new NoRightsError());
        }
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle,
};
