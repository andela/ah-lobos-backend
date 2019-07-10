import express from 'express';
import articleController from '../../controllers/articleController';
import auth from '../../middlewares/auth';
import checkUser from '../../middlewares/checkUser';
import { multerUploads } from '../../middlewares/multer';
import { cloudinaryConfig } from '../../db/config/cloudinaryConfig';

const router = express.Router();
router.use('*', cloudinaryConfig);

router.post('/articles', auth.checkAuthentication, multerUploads, articleController.postArticle);
router.delete('/article/:slug', auth.checkAuthentication, checkUser.isArticleOwner, articleController.removeArticle);
router.get('/articles/:slug', articleController.readArticle);
router.put('/articles/:slug', auth.checkAuthentication, checkUser.isArticleOwner, multerUploads, articleController.updateArticle);
router.get('/articles', articleController.listAllArticles);

export default router;
