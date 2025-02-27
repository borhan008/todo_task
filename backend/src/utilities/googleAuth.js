const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const dotenv = require("dotenv");
const User = require("../models/user");
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.MAIL_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const email = profile.emails[0].value;
      const user = await User.findOne({ email });
      if (user) {
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        user.googleId = profile.id;
        await user.save();
        return done(null, { user, accessToken, refreshToken });
      } else {
        return done(null, false);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
