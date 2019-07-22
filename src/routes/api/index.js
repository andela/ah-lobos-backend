import express from 'express';
import users from './users';
import articles from './articles';
import auth from './auth';
import profiles from './profiles';
import comments from './comments';
import followers from './followers';
import bookmark from './bookmark';

const router = express.Router();

router.use('/api', users);
router.use('/api', profiles);
router.use('/api', bookmark);
router.use('/api', articles);
router.use('/api', comments);
router.use(auth);
router.use('/api', followers);

export default router;
