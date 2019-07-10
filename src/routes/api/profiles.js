import express from 'express';
import profileController from '../../controllers/profileController';
import isAuth from '../../middlewares/isAuth';
import { multerUploads } from '../../middlewares/multer';
import { cloudinaryConfig } from '../../db/config/cloudinaryConfig';

const router = express.Router();
router.use('*', cloudinaryConfig);

router.get('/profile/:username', isAuth.hasToken, profileController.viewProfile);
router.put('/profiles/:username', isAuth.hasToken, isAuth.isOwner, multerUploads, profileController.updateProfile);

export default router;
