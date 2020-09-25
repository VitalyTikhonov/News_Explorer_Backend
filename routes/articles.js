const router = require('express').Router();
const { validatePostArticle, validateDeleteArticle } = require('../middleware/celeb-validate-req');
const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getAllArticles);
router.post('/', validatePostArticle, createArticle);
router.delete('/:articleId', validateDeleteArticle, deleteArticle);
module.exports = router;
