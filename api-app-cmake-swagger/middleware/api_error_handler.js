/** @format */

const ApiError = require('../error/ApiError');

const apiErrorHander = (err, req, res, next) => {
  // console.error(err);

  // Known errors
  if (err instanceof ApiError) {
    res.status(err.code).json({
      success: false,
      msg: err.message,
    });
    return;
  } else {
    // Unknown errors
    res.status(500).json({
      success: false,
      msg: 'Something went wrong',
    });
  }
  next();
};

module.exports = apiErrorHander;
