const express = require('express');
const passport = require('passport');
const uuid = require('uuid');

const utils = require('../../lib/passportUtils');
const users = require('../../test_database').users;

const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.render('home');
});

// Auth log in
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  const existed = (user) => user.username == req.body.username;
  if (!users.some(existed)) {
    return res.status(401).json({
      msg: 'User not found',
    });
  } else {
    const foundUser = users.find(existed);
    const isValidPassword = utils.validPassword(
      req.body.password,
      foundUser.hash,
      foundUser.salt
    );
    if (isValidPassword) {
      const tokenObject = utils.issueJWT(foundUser);
      res.status(200).json({
        success: true,
        user: foundUser,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      });
      console.log(
        `User ${foundUser.username} has been successfully logged in`,
        '\n',
        foundUser,
        '\n',
        `Auth token: ${tokenObject.token}`,
        '\n',
        `Exprired in: ${tokenObject.expires}`
      );
    } else {
      res
        .status(401)
        .json({ success: false, msg: 'you entered the wrong password' });
    }
  }
});

// Register
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
  const existed = (user) => user.username == req.body.username;
  if (users.some(existed)) {
    return res.status(400).json({
      msg: 'User already existed',
    });
  }

  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hashPassword = saltHash.hash;

  const newUser = {
    id: uuid.v4(),
    username: req.body.username,
    hash: hashPassword,
    salt: salt,
  };

  // Add user to the db
  users.push(newUser);
  console.log('A new user has been registered ', '\n', newUser);

  const jwt = utils.issueJWT(newUser);
  res.json({
    success: true,
    user: newUser,
    token: jwt.token,
    expriesIn: jwt.expries,
  });
});

//Log out
router.get('/logout', (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/REST_API');
});

module.exports = router;
