import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import config from '../envirnoment';

passport.use(new FacebookStrategy({
  clientID: config.facebook_app_id,
  clientSecret: config.facebook_app_secret,
  callbackURL:`https://ah-lobos-backend-swagger.herokuapp.com/auth/facebook/callback`,
  profileFields: ['id', 'displayName', 'photos', 'email']
},
(accessToken, refreshToken, profile, done) => {
    done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;
