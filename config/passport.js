import passport from "passport";
const LocalStrategy = require("passport-local").Strategy;
import mongoose from "mongoose";
const User = mongoose.model("User");

module.exports = passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        function(email, password, done) {
            User.findOne({ email: email })
                .then(function(user) {
                    if (!user || !user.validPassword(password)) {
                        return done(null, false, {
                            errors: { "email or password": "is invalid" }
                        });
                    }
                    return done(null, user);
                })
                .catch(done);
        }
    )
);
