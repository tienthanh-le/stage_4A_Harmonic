const express = require('express');

const utils = require('../../lib/passportUtils');
// Loading users database
const User = require('../../config/database');
User.loadDatabase((err) => {
  if (err != null) {
    console.log('Error loading datase');
  }
});

const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.render('home');
});

// Auth log in
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err != null) {
      return res
        .status(500)
        .json({ success: false, msg: 'Server error while loging in' });
    }
    if (user == null) {
      return res.status(401).json({ success: false, msg: 'User not found' });
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
      return res.status(401).json({ success: false, msg: 'Wrong password' });
    }
  });
});

// Register
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  // Verifiy if a password is entered
  if (!req.body.password) {
    return res.status(400).json({
      msg: 'No password included in the request',
    });
  }

  User.findOne({ username: req.body.username }, (err, user) => {
    if (err != null) {
      return res
        .status(500)
        .json({ success: false, msg: 'Server error while registering' });
    }
    if (user != null) {
      return res
        .status(400)
        .json({ msg: `User ${req.body.username} is already existed` });
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
          return res
            .status(500)
            .json({ success: false, msg: 'Server error while registering' });
        } else {
          console.log(
            `User ${user.username} has been successfully registered with ID of ${user._id}`
          );
        }
      });
      //(Not necessary) Create a default token
      // const jwt = utils.issueJWT(newUser);
      res.json({
        success: true,
        user: newUser,
        // token: jwt.token,
        // expriesIn: jwt.expries,
      });
    }
  });
});

//Log out
router.get('/logout', (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/REST_API');
});

module.exports = router;
