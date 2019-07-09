import passport from 'passport';
import TwitterTokenStrategy from 'passport-twitter';
import config from '../envirnoment';

passport.use(new TwitterTokenStrategy({
    consumerKey: config.twitter_app_id,
    consumerSecret: config.twitter_app_secret,
    callbackURL: config.twitter_callback
  },
  (token, tokenSecret, profile, done) => {
      done(null, profile);
  }
));

export default passport;
