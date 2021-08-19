// // var addon = require('bindings')('cmake-addon');

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

/////////////////////////////////////////////////////////
// const ObjectWrapDemo = require("./lib/binding");

// const instance = new ObjectWrapDemo("Created by New");

// console.log(instance.callStr("Should be shown by printf"));

// console.log(instance.getLength(["a","b","c","d"]));

//////////////////
const fs = require('fs');
const newData = {
  id: '12',
  username: 'aa',
  hash: 'sa',
  salt: 'sa',
};

// open destination file for appending
// var w = fs.createWriteStream('testDb.js', { flags: 'a' });
// // open source file for reading
// var r = fs.createReadStream('testDB2.js');

// w.on('close', function () {
//   console.log('done writing');
// });

// r.pipe(w);

// console.log(require('./testDb'));

/////////////////////////////////////////////////

// fs.appendFile('testDb.js', 'newData', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });

// fs.readFile('/test_app.js', 'utf8', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//   }
// });

// fs.writeFile('./testDb3.js', par newData, function (err) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log('The file was saved!');
// });

///////////////////////////////////////

// const users = [
//   {
//     id: '1',
//     username: 'admin',
//     hash: 'someHash',
//     salt: 'someSalt',
//   },
// ];

// module.exports = users;

///////////////////////////////////////

const fsPromises = require('fs').promises;

const sampleData = {
  firstName: 'John',
  lastName: 'Doe',
  age: 50,
  eyeColor: 'blue',
};

const writeToFile = async () => {
  for (const dataObject of Object.keys(sampleData)) {
    console.log(sampleData[dataObject]);
    await fsPromises.appendFile(
      'testDb3.js',
      dataObject + ': ' + JSON.stringify(sampleData[dataObject]) + '\n'
    );
  }
};

//writeToFile();

const str = JSON.stringify(sampleData, null, 2);
const new_str = str.replace();
console.log(new_str);
// fs.appendFile('./testDb3.js', str, function (err) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log('The file was saved!');
// });
