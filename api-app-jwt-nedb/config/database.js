const Datastore = require('nedb');

const User = new Datastore({
  filename: 'database/users.db',
  //autoload: true,
});

module.exports = User;
