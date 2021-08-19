const express = require('express');
const session = require('express-session');
const passport = require('passport');
let logger = require('morgan');

const isLoggedIn = require('./middleware/isLoggedin');
const custom_logger = require('./middleware/custom_logger');

const PORT = process.env.PORT || 8001;
const HOST = '127.0.0.2';

const app = express();

//Middleware
app.use(custom_logger);
app.use(logger('dev'));
app.use(session({ secret: 'secret' }));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Call passportSetup
require('./config/passport-setup');

// Set up view engine
app.set('view engine', 'ejs');

//Login Routes
app.use('/REST_API/', require('./routes/auth/auth-routes'));

//API Routes
app.use(
  '/REST_API/api',
  passport.authenticate('jwt', { session: false }),
  require('./routes/app/api')
);

//Users database
app.use(
  '/REST_API/users',
  passport.authenticate('jwt', { session: false }),
  require('./routes/app/users')
);

app.listen(PORT, HOST, () =>
  console.log(`Server ${HOST}:${PORT} is running ...`)
);
