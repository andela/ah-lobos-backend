import express from 'express';
import reportController from '../../controllers/reportController';
import auth from '../../middlewares/auth';
import articleValidation from '../../middlewares/articleValidation';
import isUserAllowed from '../../middlewares/checkUserPermissions';


const router = express.Router();

/**
 * Header   : token <token>
 * Params   : Slug of an article to be reported
 * Body     : { message: < meaningful reason to report an article> }
 * Authenticated user should report an article.
 */
router.use('/', auth.checkAuthentication, isUserAllowed.checkReportingsPermissions);

router.post('/articles/:slug', articleValidation.validReportMessage, reportController.postReport);
router.get('/articles', reportController.getAllReportedArticles);

export default router;
