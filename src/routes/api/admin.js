import express from 'express';
import adminManager from '../../controllers/adminController';
import auth from '../../middlewares/auth';
import isUserAllowed from '../../middlewares/checkUserPermissions';
import checkUser from '../../middlewares/checkUser';
import userController from '../../controllers/userControllers';
import SignupValidation from '../../middlewares/signup';
import profileController from '../../controllers/profileController';
import { multerUploads } from '../../middlewares/multer';
import { cloudinaryConfig } from '../../db/config/cloudinaryConfig';


const router = express.Router();

router.use('*', cloudinaryConfig);

// Allow only super admin
router.use('/', auth.checkAuthentication, isUserAllowed.checkUsersPermissions, checkUser.isAdmin);

router.get('/admin/users', adminManager.getAll);
router.post('/admin/users', SignupValidation.signupvalidator, userController.registerUser);
router.delete('/admin/users/:id', adminManager.delete);
router.put('/admin/profiles/:username', multerUploads, profileController.updateProfile);

export default router;
