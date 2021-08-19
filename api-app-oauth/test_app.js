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
const ObjectWrapDemo = require("./lib/binding");

const instance = new ObjectWrapDemo("Created by New");

console.log(instance.callStr("Should be shown by printf"));

console.log(instance.getLength(["a","b","c","d"]));