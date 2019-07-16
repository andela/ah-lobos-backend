import express from 'express';
import users from './users';
import articles from './articles';
import auth from './auth';
import profiles from './profiles';

const router = express.Router();

router.use('/api', users);
router.use('/api', profiles);
router.use('/api', articles);
router.use(auth);

export default router;
