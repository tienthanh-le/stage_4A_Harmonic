const passport = require('passport');
const fs = require('fs');
const path = require('path');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../config/database');
User.loadDatabase((err) => {
  if (err != null) {
    console.log('Error loading datase');
  }
});

const pathToKey = path.join(__dirname, '..', 'keys', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8');

// HTTP Header Authorization : Bearer <token>
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload.sub }, (err, user) => {
      if (err != null) {
        return done(err, false);
      }
      if (user != null) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
