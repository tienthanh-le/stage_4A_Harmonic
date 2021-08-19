const addon = require('bindings')('cmake-addon');

function ObjectWrapDemo(name) {

    let addonInstance = new addon.ObjectWrapDemo(name);

    this.callStr = function(str) {
        return addonInstance.callStr(str);
    }

    this.getLength = function(str) {
        return addonInstance.getLength(str);
    }
}

module.exports = ObjectWrapDemo;