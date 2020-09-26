const mongoose = require('mongoose');
const Article = require('../models/article');

const NoDocsError = require('../errors/NoDocsError');
const DocNotFoundError = require('../errors/DocNotFoundError');
const InvalidInputError = require('../errors/InvalidInputError');

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
      .then((respObj) => res.send({
        keyword: respObj.keyword,
        title: respObj.title,
        text: respObj.text,
        date: respObj.date,
        source: respObj.source,
        link: respObj.link,
        image: respObj.image,
        _id: respObj._id,
      }))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          // console.log('err', err);
          next(new InvalidInputError(err));
        }
      });
  } catch (err) {
    next(err);
  }
}

function deleteArticle(req, res, next) {
  try {
    const { articleId } = req.params; // проверяется joi-objectid
    Article.findById(articleId)
      .orFail(new DocNotFoundError('article'))
      .then((respObj) => {
        respObj.deleteOne()
          .then((deletedObj) => res.send(deletedObj));
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
