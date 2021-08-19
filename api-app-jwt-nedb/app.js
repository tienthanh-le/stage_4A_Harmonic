const express = require('express');
const passport = require('passport');
let logger = require('morgan');

const time_log = require('./middleware/time_logger');
//const isAdmin = require('./middleware/isAdmin');

const PORT = process.env.PORT || 8001;
const HOST = '127.0.0.2';

const app = express();

//Middleware
app.use(time_log);
app.use(logger('dev'));
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Passport middlware
require('./config/passport-setup');

// Set up view engine
app.set('view engine', 'ejs');

//API Route
app.use(
  '/REST_API/api',
  passport.authenticate('jwt', { session: false }),
  require('./routes/app/api')
);

// USER Route
// Standard user
app.use('/REST_API/', require('./routes/auth/users'));
// Admin
app.use(
  '/REST_API/users',
  passport.authenticate('jwt', { session: false }),
  require('./routes/app/users_management')
);

app.listen(PORT, HOST, () =>
  console.log(`Server ${HOST}:${PORT} is running ...`)
);
