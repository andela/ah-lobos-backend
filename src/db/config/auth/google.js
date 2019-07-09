import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import config from '../envirnoment';

passport.use(new GoogleStrategy({
    clientID: config.google_app_id,
    clientSecret: config.google_app_secret,
    includeEmail: true,
    callbackURL: `${config.host}/auth/google/callback`
  },
  (accessToken, refreshToken, profile, done) => {
    done(null, profile);
  }
));

export default passport;
