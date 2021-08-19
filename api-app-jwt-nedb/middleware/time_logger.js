const moment = require('moment');

const time_log = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get('host')}${
      req.originalUrl
    } at ${moment().format()}`
  );
  next();
};

module.exports = time_log;
