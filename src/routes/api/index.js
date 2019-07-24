import express from 'express';
import users from './users';
import articles from './articles';
import auth from './auth';
import profiles from './profiles';
import comments from './comments';
import followers from './followers';
import bookmark from './bookmark';
import reports from './reports';
import admin from './admin';

const router = express.Router();

router.use('/api/articles', articles);
router.use('/api/users', users);
router.use('/api/profiles', profiles);
router.use('/api/comments', comments);
router.use('/api/followers', followers);
router.use('/api/bookmark', bookmark);
router.use(auth);
router.use('/api/report', reports);
router.use('/api', admin);

export default router;
