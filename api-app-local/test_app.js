/** @format */

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

//////////////////////////////////
const addon = require('bindings')('cmake-addon');

const result = addon.getData2();

console.log(result);

router.post('/ipstream',(req, res)=> {
    const newData= {
      stream_enable: req.body.stream_enable,
      IP_subscribe_address:req.body.IP_subscribe_address,
      UDP_subscribe_port:req.body.UDP_subscribe_port,
      source_IP_address:req.body.source_IP_address,
      FEC_enable:req.body.FEC_enable,
      physical_port:req.body.physical_port,
    }
  
    if(!newData){
      res.status(400).json({
        success: false;
        msg: "No data in the request"
      })
    }
  
    addon.setIpstream(newData.stream_enable, newData.IP_subscribe_address, newData.UDP_subscribe_port, newData.source_IP_address, newData.FEC_enable, newData.physical_port);
  })

