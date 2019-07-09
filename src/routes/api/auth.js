import express from 'express';
import passportFacebook from '../../db/config/auth/facebook';
import passportGoogle from '../../db/config/auth/google';
import passportTwitter from '../../db/config/auth/twitter';
import socialLogin from '../../controllers/socialLogin';
import socialUser from '../../middlewares/socialUserExists';
import socialMiddleware from '../../middlewares/socialTest';


const router = express.Router();

/**
 * Facebook Tests
 */
router.post('/login/facebook/test', socialMiddleware, socialUser.google, socialLogin.facebookLogin);

/**
 * Facebook Route
 */
router.get('/facebook', passportFacebook.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback', passportFacebook.authenticate('facebook', { scope: ['email'] }), socialUser.google, socialLogin.facebookLogin);

/**
 *  Google login tests
 */
router.post('/login/google/test', socialMiddleware, socialUser.google, socialLogin.facebookLogin);

/**
 * Google Route
 */
router.get('/google', passportGoogle.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passportGoogle.authenticate('google', { session: false }), socialUser.google, socialLogin.googleLogin);


/**
 * Twitter Test
 */
router.post('/login/twitter/test', socialMiddleware, socialUser.twitter, socialLogin.twitterLogin);

/**
 * Twitter Route
 */
router.get('/twitter', passportTwitter.authenticate('twitter', { scope: ['profile', 'email'] }));
router.get('/auth/twitter/callback', passportTwitter.authenticate('twitter', { session: false }), socialUser.twitter, socialLogin.twitterLogin);


export default router;
