import express from 'express';
import bookmarkManager from '../../controllers/bookmarkController';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/:slug', auth.checkAuthentication, bookmarkManager.create);
router.delete('/:slug', auth.checkAuthentication, bookmarkManager.remove);
router.get('/articles', auth.checkAuthentication, bookmarkManager.getAllArticlesBookmarked);

export default router;
