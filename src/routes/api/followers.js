import express from 'express';
import followersController from '../../controllers/followersController';
import auth from '../../middlewares/auth';
import exist from '../../middlewares/userExist';

const router = express.Router();

router.post('/profiles/:username/follow', auth.checkAuthentication, exist.isUser, followersController.followUser);
router.delete('/profiles/:username/unfollow', auth.checkAuthentication, exist.isUser, followersController.unfollowUser);
router.get('/profiles/followees', auth.checkAuthentication, followersController.viewFollowees);
router.get('/profiles/followers', auth.checkAuthentication, followersController.viewFollowers);

export default router;
