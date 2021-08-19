const express = require('express');
const isAdmin = require('../../middleware/isAdmin');

const utils = require('../../lib/passportUtils');
// Loading users database
const User = require('../../config/database');
User.loadDatabase((err) => {
  if (err != null) {
    console.log('Error loading datase');
  }
});

const router = express.Router();

//View users data
// Restricted to admin only
router.get('*', isAdmin);
router.get('/', (req, res) => {
  User.find({}, (err, user) => {
    if (err != null) {
      return res.status(500).json({ success: false, msg: 'Server error !' });
    } else {
      res.status(200).json({ success: true, msg: user });
    }
  });
});

router.get('/:_id', (req, res) => {
  User.findOne({ _id: req.params._id }, (err, user) => {
    if (err != null) {
      return res.status(500).json({ success: false, msg: 'Server error !' });
    }
    if (user == null) {
      return res.status(404).json({
        success: false,
        msg: `User with the id ${req.params._id} not existed`,
      });
    } else {
      console.log(`GET user by ID successfully! User found: \n`, user);
      return res.status(200).json({
        success: true,
        user: user,
      });
    }
  });
});

//Change password

router.put('/:_id', (req, res) => {
  User.findOne({ _id: req.params._id }, (err, user) => {
    if (err != null) {
      return res.status(500).json({ success: false, msg: 'Server error !' });
    }
    if (user == null) {
      return res.status(404).json({
        success: false,
        msg: `User with the id ${req.params._id} not existed`,
      });
    } else {
      const newSaltHash = utils.genPassword(req.body.password);
      User.update(
        { salt: user.salt },
        { $set: { salt: newSaltHash.salt, hash: newSaltHash.hash } },
        { multi: false },
        (err, numReplaced) => {
          if (err) {
            return res.status(500).json({
              success: false,
              msg: 'Server error while updating salt',
            });
          }
          console.log(`${numReplaced} user password has been changed`);
        }
      );
      console.log(
        `User with the ID of ${user._id} has successfully changed password`
      );
      return res.status(200).json({
        success: true,
        user: user,
      });
    }
  });
});

router.delete('/:_id', isAdmin, (req, res) => {
  User.findOne({ _id: req.params._id }, (err, user) => {
    if (err != null) {
      return res.status(500).json({ success: false, msg: 'Server error !' });
    }
    if (user == null) {
      return res.status(404).json({
        success: false,
        msg: `User with the id ${req.params._id} not existed`,
      });
    } else {
      User.remove({ _id: req.params._id }, (err, numRemoved) => {
        if (err != null) {
          return res
            .status(500)
            .json({ success: false, msg: 'Error while removing user' });
        }
        console.log(`${numRemoved} has been removed`);
        res.status(200).json({
          success: true,
          msg: `User with ID ${req.params._id} has been removed`,
        });
      });
    }
  });
});

module.exports = router;
