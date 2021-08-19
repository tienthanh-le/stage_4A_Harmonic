const crypto = require('crypto');

function genPassword(password) {
  // Generate random salt using cryto lib
  var salt = crypto.randomBytes(32).toString('hex');

  // Cryto method : pbkdf2, number of iterations: 1000, hash size : 64, hash func using : sha512
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex'); // convert to hex string

  return {
    salt: salt,
    hash: genHash,
  };
}

function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hash === hashVerify;
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
