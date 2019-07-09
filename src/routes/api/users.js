import express from 'express';
import userController from '../../controllers/userControllers';
import SignupValidation from '../../middlewares/signup';
import logout from '../../middlewares/logout';

const { logoutToken } = logout;


const router = express.Router();

router.post('/verification', userController.verification);
router.post('/users/login', userController.login);
router.post('/user/forgot-password', userController.forgotPassword);
router.post('/user/reset-password/:userToken', userController.resetPassword);
router.post('/users', SignupValidation.signupvalidator, userController.registerUser);
router.post('/users/logout', logoutToken, userController.logout);

export default router;
