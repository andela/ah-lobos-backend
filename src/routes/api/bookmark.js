import express from 'express';
import bookmarkManager from '../../controllers/bookmarkController';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/bookmark/:slug', auth.checkAuthentication, bookmarkManager.create);
router.delete('/bookmark/:slug', auth.checkAuthentication, bookmarkManager.remove);
router.get('/articles/bookmark', auth.checkAuthentication, bookmarkManager.getAllArticlesBookmarked);

export default router;
