const express = require('express');
const passport = require('passport');

const router = express.Router();

//Auth log in
router.get('/login', (req, res) => {
  res.render('login');
});

//Auth log out
router.get('/logout', (req, res) => {
  //handle with passport
  req.logout();
  res.send('log out');
});

//Endpoints
//Log in
router.get('/google', passport.authenticate('oauth2', { scope: ['profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('oauth2', {
    //successRedirect: '/protected',
    failureRedirect: '/login',
  }),
  (req, res) => {
    // Successful authentication, redirect /auth.
    res.redirect('/api');
  }
);

module.exports = router;
