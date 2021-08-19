/*
Cmake addons testing
*/
// var addon = require('bindings')('cmake-addon');

// // //console.log(addon.compare(1,abv));
// // //console.log(addon.getData(1));
// // console.log(addon.genArray(1));

// const { Example } = require('bindings')('addon')

// const example = new Example(11)
// console.log(example.GetValue())
// // print 11
// example.SetValue(19)
// console.log(example.GetValue());
// // print 19

///////////////////////////////////////

// const ObjectWrapDemo = require("./lib/binding");

// const instance = new ObjectWrapDemo("Created by New");

// console.log(instance.callStr("Should be shown by printf"));

// console.log(instance.getLength(["a","b","c","d"]));

/*
Nedb testing
*/

const express = require('express');
const passport = require('passport');
const User = require('./config/database');
User.loadDatabase((err) => {
  if (err != null) {
    console.log('Error loading datase');
  }
});

const newUser = {
  username: 'mockUser',
  hash: 'mockHash',
  salt: 'mockSalt',
  role: 'USER',
};
const anotherUser = {
  username: 'mmockUser',
  hash: 'mockHash',
  salt: 'mockSalt',
  role: 'USER',
};
const updatedUser = {
  username: 'mockUser1',
  hash: 'updatedSash',
  salt: 'updatedSalt',
  role: 'USER',
};
const defaultUser = {
  username: 'mockAdmin',
  hash: 'mockHash',
  salt: 'mockSalt',
  role: 'ADMIN',
};

//INSERT

// User.findOne({ username: anotherUser.username }, (err, user) => {
//   if (err != null) {
//     return console.log('err called');
//   }
//   if (user != null) {
//     return console.log(`User ${user.username} existed`);
//   } else {
//     User.insert(newUser, (err, user) => {
//       if (err != null) {
//         return console.log(err);
//       } else {
//         console.log(
//           `User ${user.username} has been successfully registered with ID of ${user._id}`
//         );
//       }
//     });
//   }
// });

// FIND

// User.findOne({ username: anotherUser.username }, (err, user) => {
//   if (err != null) {
//     return console.log('err called');
//   }
//   if (user == null) {
//     return console.log(`User ${anotherUser.username} not found`);
//   }
//   return console.log(user.salt);
// });

// REMOVE

// User.findOne({ username: anotherUser.username }, (err, user) => {
//   if (err) {
//     return console.log('err called');
//   }
//   if (!user) {
//     return console.log(`User ${anotherUser.username} not found`);
//   }
//   User.remove({ username: anotherUser.username }, (err, numRemoved) => {
//     console.log(`num removed ${numRemoved}`);
//   });
// });

// REMOVE by id

// User.findOne({ _id: 'MMeKqDS3q79WYTw8' }, (err, user) => {
//   if (err != null) {
//     return console.log('err called');
//   }
//   if (user == null) {
//     return console.log(`User not found`);
//   }
//   User.remove({ _id: 'MMeKqDS3q79WYTw8' }, (err, numRemoved) => {
//     console.log(`num removed ${numRemoved}`);
//   });
// });

// UPDATE

// User.findOne({ username: defaultUser.username }, (err, user) => {
//   if (err != null) {
//     return console.log('err called');
//   }
//   if (user == null) {
//     return console.log(`User ${user.username} not existed`);
//   } else {
//     User.update(
//       { salt: user.salt },
//       { $set: { salt: updatedUser.salt, hash: updatedUser.hash } },
//       { multi: false },
//       (err, numReplaced) => {
//         if (err != null) {
//           console.log('Err while updating');
//           console.log(numReplaced);
//         } else {
//           console.log('OK');
//           console.log(numReplaced);
//         }
//       }
//     );
//   }
// });
