import express from 'express';
import users from './users';
import profiles from './profiles';

const router = express.Router();

router.use('/api', users);
router.use('/api', profiles);

export default router;
