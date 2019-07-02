import express from 'express';
import userController from '../../controllers/userControllers';

const router = express.Router();

router.post('/users', userController.registerUser);
router.post('/users/login', userController.login);

export default router;
