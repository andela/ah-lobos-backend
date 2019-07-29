import express from 'express';
import users from './users';
import articles from './articles';
import auth from './auth';
import comments from './comments';
import followers from './followers';
import bookmark from './bookmark';
import reports from './reports';
import admin from './admin';
import notifications from './notifications';

const router = express.Router();

router.use('/api/articles', articles);
router.use('/api/users', users);
router.use('/api/comments', comments);
router.use('/api/followers', followers);
router.use('/api/bookmark', bookmark);
router.use('/api/notifications', notifications);
router.use('/api/report', reports);
router.use('/api', admin);

router.use(auth);


export default router;
