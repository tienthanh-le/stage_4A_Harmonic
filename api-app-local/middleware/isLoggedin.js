const express = require('express');

const isLoggedIn = (req, res, next) => {
  req.user
    ? next()
    : res.status(401).json({
        msg: 'Unauthorized! Log in to access to this route  ',
      });
};

module.exports = isLoggedIn;
