import express from 'express';
import commentController from '../../controllers/commentController';
import isAuth from '../../middlewares/auth';
import validationComments from '../../helpers/commentValidation';
import logout from '../../middlewares/logout';
import checkUser from '../../middlewares/checkUser';


const router = express.Router();

const { logoutToken } = logout;

router.post('/articles/:slug/comments', isAuth.checkAuthentication, logoutToken, validationComments.commentValidation, commentController.createrComment);
router.delete('/articles/:slug/comments/:id', isAuth.checkAuthentication, logoutToken, checkUser.isCommentOwner, commentController.deleteComment);
router.get('/articles/:slug/comment', commentController.getComments);

export default router;
