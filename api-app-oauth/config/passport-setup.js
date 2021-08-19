const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');

const keys = require('./keys');
passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: keys.google_keys.authorizationURL,
      tokenURL: keys.google_keys.tokenURL,
      clientID: keys.google_keys.clientID,
      clientSecret: keys.google_keys.clientSecret,
      callbackURL: keys.google_keys.callbackURL,
    },
    (accessToken, refreshToken, profile, cb) => {
      //passport callback
      //   User.findOrCreate({ exampleId: profile.id }, (err, user) => {
      //     return cb(err, user);
      //   });
      console.log(profile);
      //return cb(err, profile);
      return cb(null, profile);
    }
  )
);

//Session
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
