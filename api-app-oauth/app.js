const express = require('express');
const session = require('express-session');
const passport = require('passport');

const isLoggedIn = require('./middleware/isLoggedin');
const logger = require('./middleware/logger');
require('./config/passport-setup'); //passportSetup

const PORT = process.env.PORT || 8001;
const HOST = 'localhost';

const app = express();

//Logger middleware
app.use(logger);
//Passport middleware
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());

// Body-parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Set up view engine
app.set('view engine', 'ejs');

//Home route
app.get('/', (req, res) => {
  res.render('home');
});

//Login Routes
//app.use('/demo-login', require('./routes/app/test-login'));
app.use('/auth', require('./routes/auth/auth-routes'));

//API Routes
app.use('/api', isLoggedIn, require('./routes/app/api'));

//127.0.0.2 not a main domain error
//127.0.0.1
app.listen(PORT, HOST, () =>
  console.log(`Server ${HOST}:${PORT} is running ...`)
);
