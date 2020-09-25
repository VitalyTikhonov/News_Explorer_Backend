const router = require('express').Router();
const { validateNewArticleInput } = require('../middleware/celeb-validate-req');
const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getAllArticles);
router.post('/', validateNewArticleInput, createArticle);
// router.delete('/articleId', validateSignup, deleteArticle);
module.exports = router;
