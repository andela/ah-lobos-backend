import express from 'express';
import commentController from '../../controllers/commentController';
import auth from '../../middlewares/auth';
import validationComments from '../../helpers/commentValidation';
import logout from '../../middlewares/logout';
import checkUser from '../../middlewares/checkUser';
import isUserAllowed from '../../middlewares/checkUserPermissions';


const router = express.Router();

const { logoutToken } = logout;

// routes that don't need authentication
router.get('/articles/:slug', commentController.getComments);

router.put('/articles/:id', auth.checkAuthentication, logoutToken, validationComments.commentValidation, checkUser.isCommentOwner, commentController.editComment);
router.get('/articles/edit/:id', commentController.getEditComment);

// check user's permissions route
router.use('/', auth.checkAuthentication, isUserAllowed.checkCommentsPermissions);

router.post('/articles/:slug', logoutToken, validationComments.commentValidation, commentController.createrComment);
router.delete('/articles/:slug/:id', logoutToken, checkUser.isCommentOwner, commentController.deleteComment);


export default router;
