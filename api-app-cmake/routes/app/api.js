const express = require('express');
const uuid = require('uuid'); // generate random id for testing POST

const router = express.Router();

const database = require('../../test_database');
var addon = require('bindings')('cmake-addon');

// Route GET 
// Get all datas 
router.get('/',(req, res) => {
    res.json(database.datas); // return as .json
})

// Get single data
router.get('/:id',(req, res) => {
    
    // Using normal JS

    // const finding_function = (data) =>  data.id === parseInt(req.params.id);
    // // Check if id existes
    // const existed = database.datas.some(finding_function);
    // if (existed) {
    //     // Create the resulted array if id existes
    //     const resultInfo = database.datas.filter(finding_function);
    //     res.status(200).json(resultInfo);
    // } 
    // else {
    //     res.status(404).json({ 
    //          msg: `Data with the id ${req.params.id} not existed`
    //     });
    // }

    // Using nodejs addons with cmake-js
    
    // Check if id existes
    if(parseInt(req.params.id) > database.datas.length)
        return res.status(404).json({msg: `Data with the id ${req.params.id} not existed`})

    //Compare id - Generate resulted array - Pass id and data as string
    let result = addon.genArray(2);
    for (let i = 0; i < database.datas.length; i++) {
        if(addon.compare(parseInt(req.params.id), database.datas[i].id)) {
            result = {
                id: addon.getData(req.params.id),
                info:addon.getData(database.datas[i].info)
            }
        }
    }

    res.status(200).json(result)
    

});

// Route PUT
router.put('/:id', (req, res) => {

    // Using normal JS
    // const finding_function = (data) =>  data.id === parseInt(req.params.id);
    // // Check if id existes
    // const existed = database.datas.some(finding_function);
    // if (existed) {
    //     database.datas.forEach(data => {
    //         if (data.id === parseInt(req.params.id)) data.info = req.body.info;    
    //         })

    //     res.status(200).json({
    //         msg : 'Updated data',
    //         database.datas
    //     });
    // }
    // else {
    //     res.status(404).json({ 
    //          msg: `Data with the id ${req.params.id} not existed`
    //     });
    // }

    // Using nodejs addons with cmake-js
    if(parseInt(req.params.id) > database.datas.length)
        return res.status(404).json({msg: `Data with the id ${req.params.id} not existed`});

    for (let i = 0; i < database.datas.length; i++){
        if(addon.compare(parseInt(req.params.id), database.datas[i].id)){
            database.datas[i].info = req.body.info;
        }
    }

    const modified_database = database.datas
    res.status(200).json({
        msg : 'Updated data',
        modified_database
    });

});

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

module.exports = router;

