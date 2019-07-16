import express from 'express';
import articleController from '../../controllers/articleController';
import auth from '../../middlewares/auth';
import checkUser from '../../middlewares/checkUser';
import { multerUploads } from '../../middlewares/multer';
import { cloudinaryConfig } from '../../db/config/cloudinaryConfig';
import likeDislikeController from '../../controllers/likeDislikeArticleController';
import articleRatingControllers from '../../controllers/articleRatingControllers';
import articleValidation from '../../middlewares/articleValidation';

const router = express.Router();
router.use('*', cloudinaryConfig);

router.post('/articles', auth.checkAuthentication, multerUploads, articleController.postArticle);
router.delete('/article/:slug', auth.checkAuthentication, checkUser.isArticleOwner, articleController.removeArticle);
router.get('/articles/:slug', articleController.readArticle);
router.put('/articles/:slug', auth.checkAuthentication, checkUser.isArticleOwner, multerUploads, articleController.updateArticle);
router.get('/articles', articleController.listAllArticles);
router.post('/articles/:slug/ratings', auth.checkAuthentication, articleValidation.rating, articleRatingControllers.rateArticle);
router.get('/ratings/:articleId', articleRatingControllers.ratingAverage);
router.post('/articles/like/:slug', auth.checkAuthentication, articleValidation.checkSlug, likeDislikeController.likeArticle);
router.post('/articles/dislike/:slug', auth.checkAuthentication, articleValidation.checkSlug, likeDislikeController.dislikeArticle);

export default router;
