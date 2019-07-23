import express from 'express';
import profileController from '../../controllers/profileController';
import auth from '../../middlewares/auth';
import logout from '../../middlewares/logout';
import isUserAllowed from '../../middlewares/checkUserPermissions';

const router = express.Router();
const { logoutToken } = logout;

// check user's permissions route
router.use('/', auth.checkAuthentication, isUserAllowed.checkFollowersPermissions);

router.get('/:username', logoutToken, profileController.viewProfile);

export default router;
