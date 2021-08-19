const passport = require('passport');
const fs = require('fs');
const path = require('path');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const user = require('../test_database').users;

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
    const foundUser = user.find((element) => element.id == jwt_payload.sub);
    if (foundUser == null) {
      return done(null, false);
    } else {
      return done(null, foundUser);
    }
  })
);
