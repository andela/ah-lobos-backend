import express from 'express';
import userController from '../../controllers/userControllers';
import SignupValidation from '../../middlewares/signup';
import logout from '../../middlewares/logout';
import permission from '../../controllers/permissions';
import auth from '../../middlewares/auth';
import isUserAllowed from '../../middlewares/checkUserPermissions';
import profileController from '../../controllers/profileController';
import isAuth from '../../middlewares/isAuth';
import { multerUploads } from '../../middlewares/multer';
import { cloudinaryConfig } from '../../db/config/cloudinaryConfig';
import checkUser from '../../middlewares/checkUser';


const { logoutToken } = logout;


const router = express.Router();

router.use('*', cloudinaryConfig);

// routes that don't need authentication
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/verification', userController.verification);
router.post('/reset-password/:userToken', userController.resetPassword);
router.post('/', SignupValidation.signupvalidator, checkUser.hasRole, userController.registerUser);
router.post('/logout', logoutToken, userController.logout);
router.get('/profile/:username', logoutToken, profileController.viewProfile);

// check user's permissions on permissions table
router.post('/permissions', auth.checkAuthentication, isUserAllowed.checkPermissions, permission.createPermission);
router.put('/permissions/:permissionNo', auth.checkAuthentication, isUserAllowed.checkPermissions, permission.changePermissions);
router.get('/permissions', auth.checkAuthentication, isUserAllowed.checkPermissions, permission.viewAllPermissions);
router.delete('/permissions/:permissionNo', auth.checkAuthentication, isUserAllowed.checkPermissions, permission.deleteRolePermissions);
router.get('/permissions/:role', auth.checkAuthentication, isUserAllowed.checkPermissions, permission.allPermissionsByRole);
router.get('/permissions/actions/:action', auth.checkAuthentication, isUserAllowed.checkPermissions, permission.allPermissionsByAction);

// check user's permissions on users table
router.use('/', auth.checkAuthentication, isUserAllowed.checkUsersPermissions);

router.get('/profiles', profileController.getAllUsersProfile);
router.put('/profile/:username', isAuth.isOwner, logoutToken, multerUploads, profileController.updateProfile);

export default router;
