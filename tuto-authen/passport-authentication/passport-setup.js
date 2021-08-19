const passport = require('passport');
const LocalStrategy = require('passport-local');

const user = {
  id: '1',
  email: 'example@email.com',
  password: 'password',
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const _user = user.id === id ? user : false;
  done(null, _user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    (email, password, done) => {
      if (email === user.email && password === user.password) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  )
);
