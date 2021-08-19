const Datastore = require('nedb');
const database = new Datastore('test_database.db');
database.loadDatabase();

const sampleData = {
  username: 'aa',
  hash: 'sa',
  salt: 'sa',
};

//database.insert(sampleData);

database.find({}, (err, res) => {
  if (err) {
    console.log(err);
  }
  console.log(res[0]);
});
