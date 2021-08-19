/** @format */

const express = require('express');
const ApiError = require('../../error/ApiError');

const router = express.Router();

const addon = require('bindings')('cmake-addon');

/* Route for IPstream*/
router.get('/controller/ipstream', (req, res) => {
  // Get all ipstream data
  res.status(200).json({
    success: true,
    ipstream1: addon.getIpstream(1),
    ipstream2: addon.getIpstream(2),
  });
});

router.get('/controller/ipstream/:id', (req, res, next) => {
  // Check if id existed
  if (parseInt(req.params.id) > 2) {
    next(ApiError.notFound(`Data with the id ${req.params.id} not existed`));
    return;
  }

  // Call getIpstream
  res.status(200).json({
    success: true,
    data: addon.getIpstream(parseInt(req.params.id)),
  });
});

router.put('/controller/ipstream/:id', (req, res, next) => {
  // Check if id existed
  if (parseInt(req.params.id) > 2) {
    next(ApiError.notFound(`Data with the id ${req.params.id} not existed`));
    return;
  }

  // Call setIpstream
  const newData = {
    stream_enable: req.body.stream_enable,
    IP_subscribe_address: req.body.IP_subscribe_address,
    UDP_subscribe_port: req.body.UDP_subscribe_port,
    source_IP_address: req.body.source_IP_address,
    FEC_enable: req.body.FEC_enable,
    physical_port: req.body.physical_port,
  };

  // If there are missing parametres
  if (
    !newData.stream_enable ||
    !newData.IP_subscribe_address ||
    !newData.UDP_subscribe_port ||
    !newData.source_IP_address ||
    !newData.FEC_enable ||
    !newData.physical_port
  ) {
    next(ApiError.badRequest(`Missing data in the request`));
    return;
  }

  addon.setIpstream(
    parseInt(req.params.id),
    newData.stream_enable,
    newData.IP_subscribe_address,
    newData.UDP_subscribe_port,
    newData.source_IP_address,
    newData.FEC_enable,
    newData.physical_port
  );

  res.status(200).json({
    success: true,
    data: addon.getIpstream(parseInt(req.params.id)),
  });
});

module.exports = router;

/*--- Testing ---*/

/* Route for test_db*/
// Route GET
// Get all datas
// router.get('/', (req, res) => {
//   res.json(database.datas); // return as .json
// });

// Get single data
// router.get('/:id', (req, res) => {
//   // Using normal JS

//   // const finding_function = (data) =>  data.id === parseInt(req.params.id);
//   // // Check if id existes
//   // const existed = database.datas.some(finding_function);
//   // if (existed) {
//   //     // Create the resulted array if id existes
//   //     const resultInfo = database.datas.filter(finding_function);
//   //     res.status(200).json(resultInfo);
//   // }
//   // else {
//   //     res.status(404).json({
//   //          msg: `Data with the id ${req.params.id} not existed`
//   //     });
//   // }

//   // Using nodejs addons with cmake-js

//   // Check if id existes
//   if (parseInt(req.params.id) > database.datas.length)
//     return res
//       .status(404)
//       .json({ msg: `Data with the id ${req.params.id} not existed` });

//   //Compare id - Generate resulted array - Pass id and data as string
//   let result = addon.genArray(2);
//   for (let i = 0; i < database.datas.length; i++) {
//     if (addon.compare(parseInt(req.params.id), database.datas[i].id)) {
//       result = {
//         id: addon.getData(req.params.id),
//         info: addon.getData(database.datas[i].info),
//       };
//     }
//   }

//   res.status(200).json(result);
// });

// // Route PUT
// router.put('/:id', (req, res) => {
//   // Using normal JS
//   // const finding_function = (data) =>  data.id === parseInt(req.params.id);
//   // // Check if id existes
//   // const existed = database.datas.some(finding_function);
//   // if (existed) {
//   //     database.datas.forEach(data => {
//   //         if (data.id === parseInt(req.params.id)) data.info = req.body.info;
//   //         })

//   //     res.status(200).json({
//   //         msg : 'Updated data',
//   //         database.datas
//   //     });
//   // }
//   // else {
//   //     res.status(404).json({
//   //          msg: `Data with the id ${req.params.id} not existed`
//   //     });
//   // }

//   // Using nodejs addons with cmake-js
//   if (parseInt(req.params.id) > database.datas.length)
//     return res
//       .status(404)
//       .json({ msg: `Data with the id ${req.params.id} not existed` });

//   for (let i = 0; i < database.datas.length; i++) {
//     if (addon.compare(parseInt(req.params.id), database.datas[i].id)) {
//       database.datas[i].info = req.body.info;
//     }
//   }

//   const modified_database = database.datas;
//   res.status(200).json({
//     msg: 'Updated data',
//     modified_database,
//   });
// });

// // Route POST
// router.post('/', (req, res) => {
//     const newData = {
//         id: uuid.v4(),
//         info: req.body.info
//     }

//     if(!newData.info){
//         res.status(400).json({
//             msg: 'No info included in the request'
//         });
//     }

//     database.datas.push(newData);

//     res.json(database.datas);
// });
