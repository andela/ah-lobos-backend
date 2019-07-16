import express from 'express';
import profileController from '../../controllers/profileController';
import isAuth from '../../middlewares/isAuth';
import { multerUploads } from '../../middlewares/multer';
import { cloudinaryConfig } from '../../db/config/cloudinaryConfig';
import logout from '../../middlewares/logout';

const router = express.Router();
router.use('*', cloudinaryConfig);
const { logoutToken } = logout;

router.get('/profile/:username', isAuth.hasToken, logoutToken, profileController.viewProfile);
router.put('/profiles/:username', isAuth.hasToken, isAuth.isOwner, logoutToken, multerUploads, profileController.updateProfile);
router.get('/users/profile', isAuth.hasToken, profileController.getAllUsersProfile);

export default router;
