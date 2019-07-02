import express from 'express';
import userController from '../../controllers/userControllers';

const router = express.Router();

router.post('/users', userController.registerUser);
router.post('/users/login', userController.login);
router.post('/user/forgot-password', userController.forgotPassword);
router.post('/user/reset-password/:userToken', userController.resetPassword);

export default router;
