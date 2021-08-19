/** @format */

const express = require('express');
const session = require('express-session');
const passport = require('passport');
let logger = require('morgan');
let cookieParser = require('cookie-parser');

const isLoggedIn = require('./middleware/isLoggedin');
const custom_logger = require('./middleware/custom_logger');

const PORT = process.env.PORT || 8001;
const HOST = 'localhost';

const app = express();

//Middleware
app.use(custom_logger);
app.use(logger('dev'));
app.use(session({ secret: 'secret' }));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Call passportSetup
require('./config/passport-setup');

// Set up view engine
app.set('view engine', 'ejs');

//Login Routes
app.use('/', require('./routes/auth/auth-routes'));

//API Routes
app.use('/api', isLoggedIn, require('./routes/app/api'));

//127.0.0.2 not a main domain error
//127.0.0.1
app.listen(PORT, HOST, () =>
  console.log(`Server ${HOST}:${PORT} is running ...`)
);
