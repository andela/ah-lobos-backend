import express from 'express';
import users from './users';
import profiles from './profiles';
import articles from './articles';

const router = express.Router();

router.use('/api', users);
router.use('/api', profiles);
router.use('/api', articles);

export default router;
