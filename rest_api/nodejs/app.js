/** @format */

const express = require('express');
const passport = require('passport');
let logger = require('morgan');
const apiErrorHander = require('./middleware/api_error_handler');
// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 8001;
const HOST = '127.0.0.2';
const app = express();

/* Middlewares */
// Logger middleware
const time_log = require('./middleware/time_logger');

/* Authentification */
//Passport
app.use(time_log);
app.use(logger('dev'));
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('./config/passport-setup');

// View engine (Currently Not use due to not using front-end pages)
// app.set('view engine', 'ejs');

/* All routes */
//API Route
app.use(
  '/REST_API/api',
  passport.authenticate('jwt', { session: false }),
  require('./routes/app/api')
);

// USER Route
// Standard user (login + register)
app.use('/REST_API/', require('./routes/auth/users'));
// Admin
app.use(
  '/REST_API/users',
  passport.authenticate('jwt', { session: false }),
  require('./routes/app/users_management')
);

/* Error handling */
// Error handling middleware
app.use(apiErrorHander);

// Running server
app.listen(PORT, HOST, () =>
  console.log(`Server ${HOST}:${PORT} is running ...`)
);
