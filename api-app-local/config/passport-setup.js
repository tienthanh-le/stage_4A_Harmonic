/** @format */

const passport = require('passport');
const LocalStrategy = require('passport-local');

const user = require('../test_database').users;
const validPassword = require('../lib/passportUtils').validPassword;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordFeild: 'password',
      //passReqToCallback: true,
    },
    (username, password, done) => {
      for (i = 0; i < user.length; i++) {
        const isValid = validPassword(password, user.hash, user.salt);

        //password === user[i].password ||
        if (username === user[i].username && isValid) {
          return done(null, user[i]);
        } else {
          return done(null, false, {
            message: 'Incorrect username or password',
          });
        }
      }
    }
  )
);

//Session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  for (let i = 0; i < user.length; i++) {
    const _user = user[i].id;
    if (_user === id) {
      done(null, _user);
    } else {
      false;
    }
  }
});
