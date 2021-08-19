/** @format */

const express = require('express');

const utils = require('../../lib/passportUtils');
const ApiError = require('../../error/ApiError');
// Loading users database
const User = require('../../config/database');
User.loadDatabase((err) => {
  if (err != null) {
    console.log('Error loading datase');
  }
});

const router = express.Router();

// Home route
// router.get('/', (req, res) => {
//   res.render('home');
// });

// Auth log in
// router.get('/login', (req, res) => {
//   res.render('login');
// });

router.post('/login', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    next(ApiError.badRequest('Missing username and/or password'));
    return;
  }
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err != null) {
      next(ApiError.internal('Server error while loging in'));
      return;
    }
    if (user == null) {
      next(ApiError.notFound('User not found'));
      return;
    }
    const isValidPassword = utils.validPassword(
      req.body.password,
      user.hash,
      user.salt
    );
    if (isValidPassword) {
      const tokenObject = utils.issueJWT(user);
      console.log(
        `User ${user.username} has been successfully logged in`,
        '\n',
        user,
        '\n',
        `Auth token: ${tokenObject.token}`,
        '\n',
        `Exprired in: ${tokenObject.expires}`
      );
      return res.status(200).json({
        success: true,
        user: user,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      });
    } else {
      next(ApiError.unauthorized('Wrong password'));
      return;
    }
  });
});

// Register
// router.get('/register', (req, res) => {
//   res.render('register');
// });

router.post('/register', (req, res, next) => {
  // Verifiy if a password is entered
  if (!req.body.username || !req.body.password) {
    next(ApiError.badRequest('Missing username and/or password'));
    return;
  }

  User.findOne({ username: req.body.username }, (err, user) => {
    if (err != null) {
      next(ApiError.internal('Server error while registering'));
      return;
    }
    if (user != null) {
      next(ApiError.badRequest(`User ${req.body.username} is already existed`));
      return;
    } else {
      // Generate new user schema
      const saltHash = utils.genPassword(req.body.password);
      const newUser = {
        username: req.body.username,
        hash: saltHash.hash,
        salt: saltHash.salt,
        role: 'USER',
      };
      // Add new user to the database
      User.insert(newUser, (err, user) => {
        if (err != null) {
          next(ApiError.internal('Server error while registering'));
          return;
        } else {
          console.log(
            `User ${user.username} has been successfully registered with ID of ${user._id}`
          );
        }
      });
      res.json({
        success: true,
        user: newUser,
      });
    }
  });
});

//Log out
// router.get('/logout', (req, res) => {
//   res.cookie('jwt', '', { maxAge: 1 });
//   res.redirect('/REST_API');
// });

module.exports = router;
