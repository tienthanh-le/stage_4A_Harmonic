const express = require('express');
const passport = require('passport');
const uuid = require('uuid');

const user = require('../../test_database').users;
const genPassword = require('../../lib/passportUtils').genPassword;

const router = express.Router();

//Test get user
router.get('/user', (req, res) => {
  res.json(user);
});

//Home route
router.get('/', (req, res) => {
  res.render('home');
});

// Auth log in
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  passport.authenticate(
    'local',
    // {
    //   successRedirect: '/api',
    //   failureRedirect: '/',
    // },
    (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        console.log('1 attempt to log in failed');
        //alert('Wrong email or password');
        return res.redirect('/');
      }
      req.login(user, () => {
        console.log('1 attempt to log in successed');
        //alert('You are authenticated');
        res.redirect('/api');
      });
    }
  )(req, res, next);
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  // Verifiy if a password is entered
  if (!req.body.password) {
    return res.status(400).json({
      msg: 'No password included in the request',
    });
  }
  // Verifiy if a user already existed
  for (i = 0; i < user.length; i++) {
    if (req.body.username == user[i].username) {
      return res.status(400).json({
        msg: 'User already existed',
      });
    }
  }

  //Generate hash password to save in the database
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hashPassword = saltHash.hash;

  const newUser = {
    id: uuid.v4(),
    username: req.body.username,
    hash: hashPassword,
    salt: salt,
  };

  //if (!newUser) {
  user.push(newUser);
  console.log('A new user has been registered');
  console.log(newUser);
  //}

  res.redirect('/login');
});

//Auth log out
router.get('/logout', (req, res) => {
  //handle with passport
  req.logout();
  res.redirect('/');
});

module.exports = router;
