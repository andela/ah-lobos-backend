import express from 'express';
import articleController from '../../controllers/articleController';
import shareArticleController from '../../controllers/shareArticleController';
import auth from '../../middlewares/auth';
import checkUser from '../../middlewares/checkUser';
import { multerUploads } from '../../middlewares/multer';
import { cloudinaryConfig } from '../../db/config/cloudinaryConfig';
import likeDislikeController from '../../controllers/likeDislikeArticleController';
import articleRatingControllers from '../../controllers/articleRatingControllers';
import articleValidation from '../../middlewares/articleValidation';
import isUserAllowed from '../../middlewares/checkUserPermissions';
import searchController from '../../controllers/searchController';

const router = express.Router();

// routes that don't need authentication
router.get('/', articleController.listAllArticles);
router.get('/:articleSlug', articleController.readArticle);
router.get('/ratings/:articleId', articleRatingControllers.ratingAverage);
router.post('/search', searchController.search);
router.post('/highlight/:slug', auth.checkAuthentication, articleValidation.checkSlug, articleController.highlightAndComment);
router.get('/user/highlight', auth.checkAuthentication, articleController.getHighlightedText);
router.get('/user/highlight/:slug', auth.checkAuthentication, articleController.getOneHighlightedText);

// routes for like/dislike
router.post('/like/:slug', auth.checkAuthentication, isUserAllowed.checkLikeDislikePermissions, articleValidation.checkSlug, likeDislikeController.likeArticle);
router.post('/dislike/:slug', auth.checkAuthentication, isUserAllowed.checkLikeDislikePermissions, articleValidation.checkSlug, likeDislikeController.dislikeArticle);

// route for ratings
router.post('/:slug/ratings', auth.checkAuthentication, isUserAllowed.checkRatingsPermissions, articleValidation.rating, articleRatingControllers.rateArticle);

// check user's permission route
router.use('/', auth.checkAuthentication, isUserAllowed.checkArticlesPermissions);
router.use('*', cloudinaryConfig);

router.post('/', multerUploads, articleController.postArticle);
router.delete('/:slug', checkUser.isArticleOwner, articleController.removeArticle);
router.put('/:slug', checkUser.isArticleOwner, multerUploads, articleController.updateArticle);
router.post('/:slug/ratings', articleValidation.rating, articleRatingControllers.rateArticle);

router.get('/:slug/email-share', auth.checkAuthentication, articleValidation.validArticle, shareArticleController.shareOnEmail);
router.get('/:slug/twitter-share', auth.checkAuthentication, articleValidation.validArticle, shareArticleController.shareOnTwitter);
router.get('/:slug/facebook-share', auth.checkAuthentication, articleValidation.validArticle, shareArticleController.shareOnFacebook);
router.get('/:slug/whatsapp-share', auth.checkAuthentication, articleValidation.validArticle, shareArticleController.shareOnWhatsapp);

export default router;
