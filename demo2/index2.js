const binding_test = require('./build/Release/binding_test');

try {
    //console.time('c++');
    console.log(binding_test.binding());
} catch(err){
    throw err;
}