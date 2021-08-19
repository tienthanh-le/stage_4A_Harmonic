/** @format */

const express = require('express');
const uuid = require('uuid'); // generate random id for testing POST

const router = express.Router();

const database = require('../../test_database');

// Route GET
// Get all datas
router.get('/', (req, res) => {
  res.json(database.datas); // return as .json
});

// Get single data
router.get('/:id', (req, res) => {
  const finding_function = (data) => data.id === parseInt(req.params.id);
  // Check if id existes
  const existed = database.datas.some(finding_function);
  if (existed) {
    // Create the resulted array if id existes
    const resultInfo = database.datas.filter(finding_function);
    res.status(200).json(resultInfo);
  } else {
    res.status(404).json({
      msg: `Data with the id ${req.params.id} not existed`,
    });
  }
});

// Route POST
router.post('/', (req, res) => {
  const newData = {
    id: uuid.v4(),
    info: req.body.info,
  };

  if (!newData.info) {
    return res.status(400).json({
      msg: 'No info included in the request',
    });
  }

  database.datas.push(newData);

  res.json(database.datas);
});

// Route PUT
router.put('/:id', (req, res) => {
  const finding_function = (data) => data.id === parseInt(req.params.id);
  // Check if id existes
  const existed = database.datas.some(finding_function);
  if (existed) {
    const updateInfo = req.body;
    database.datas.forEach((data) => {
      if (data.id === parseInt(req.params.id)) data.info = updateInfo.info;
    });

    const edittedDatas = database.datas;
    res.status(200).json({
      msg: 'Updated data',
      edittedDatas,
    });
  } else {
    res.status(404).json({
      msg: `Data with the id ${req.params.id} not existed`,
    });
  }
});

module.exports = router;
