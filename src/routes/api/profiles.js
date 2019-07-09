import express from 'express';
import profileController from '../../controllers/profileController';
import isAuth from '../../middlewares/isAuth';

const router = express.Router();

router.get('/profile/:username', isAuth.hasToken, profileController.viewProfile);
router.put('/profiles/:username', isAuth.hasToken, isAuth.isOwner, profileController.updateProfile);

export default router;
