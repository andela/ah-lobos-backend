import express from 'express';
import userController from '../../controllers/userControllers';
import SignupValidation from '../../middlewares/signup';

const router = express.Router();

router.post('/users/login', userController.login);
router.post('/user/forgot-password', userController.forgotPassword);
router.post('/user/reset-password/:userToken', userController.resetPassword);
router.post('/users', SignupValidation.signupvalidator, userController.registerUser);

export default router;
