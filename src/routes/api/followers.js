import express from 'express';
import followersController from '../../controllers/followersController';
import auth from '../../middlewares/auth';
import exist from '../../middlewares/userExist';
import isUserAllowed from '../../middlewares/checkUserPermissions';

const router = express.Router();

// check user's permissions route
router.use('/', auth.checkAuthentication, isUserAllowed.checkFollowersPermissions);

router.post('/:username/follow', exist.isUser, followersController.followUser);
router.delete('/:username/unfollow', exist.isUser, followersController.unfollowUser);
router.get('/followees', followersController.viewFollowees);
router.get('/', followersController.viewFollowers);

export default router;
