const express = require('express');
const passport = require('passport');

const utils = require('../../lib/passportUtils');
const users = require('../../test_database').users;

const router = express.Router();

//View users data
router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  // Check if id existes
  const finding_function = (user) => user.id == req.params.id;
  const existed = users.some(finding_function);
  if (existed) {
    const foundUser = users.filter(finding_function);
    console.log('User found: ', '\n', foundUser);
    res.status(200).json(foundUser);
  } else {
    console.log('User not found');
    res.status(404).json({
      msg: `User with the id ${req.params.id} not existed`,
    });
  }
});

//Change password
router.put('/:id', (req, res) => {
  const finding = (user) => user.id == req.params.id;
  // Check if id existes
  const existed = users.some(finding);
  if (existed) {
    users.forEach((user) => {
      if (user.id == req.params.id) {
        const newSaltHash = utils.genPassword(req.body.password);
        user.salt = newSaltHash.salt;
        user.hash = newSaltHash.hash;
      }
    });
    const modifiedUser = users.find(finding);
    console.log('User with the password modified: ', '\n', modifiedUser);
    res.status(200).json({
      msg: 'Updated user password',
      modifiedUser,
    });
  } else {
    console.log('User not found');
    res.status(404).json({
      msg: `User with the id ${req.params.id} not existed`,
    });
  }
});

module.exports = router;
